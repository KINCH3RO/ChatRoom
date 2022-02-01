import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { Attachment } from 'src/app/models/attachment';
import { Chatroom } from 'src/app/models/chatroom';
import { MenuBuilderProps } from 'src/app/models/menu-builder-props';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { FileUtilityService } from 'src/app/services/file-utility.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MicInputService } from 'src/app/services/mic-input.service';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { UnreadMessagesService } from 'src/app/services/unread-messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.scss']
})
export class ChatComponentComponent implements OnInit, OnDestroy {

  constructor(
    private socket: SocketManagerService,
    private LS: LocalStorageService,
    private userService: UserService,
    private fileUtility: FileUtilityService,
    private micInput: MicInputService,
    private chatRoomService: ChatroomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private unreadMessagesService: UnreadMessagesService
  ) {

  }



  @ViewChild('messageContainer') private messagesContainer: ElementRef;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  chatRoom: Chatroom;
  chatMembers: object = {}
  textInput: String = "";
  selectedFiles = []
  CurrentUser: User = null;
  otherUser: User = null
  loadingMessages = false
  privateChat = false;
  showEmojiPanel = false;
  scrollInterrupted = false;
  headerInformation = {
    headerPic: null,
    headerText: null,
    headerDescription: null
  }



  ngOnInit() {

    this.initializeComp()
    this.socketIoEvents()
  }

  ngOnDestroy(): void {
    // this.socket.getSocket().off("message")
    //set date required to retrive unseen messages
    this.unreadMessagesService.setLastSeenMessage(this.chatRoom._id, new Date())
    this.socket.getSocket().off("updateMessage")
    this.socket.getSocket().off("deleteMessage")

    if (this.privateChat) {
      this.socket.getSocket().emit("leaveRoom", this.chatRoom._id)
    }



  }


  async createOrFindPrivateChatRoom(otherUserId, callback = null) {
    let doc = null
    try {
      doc = await lastValueFrom(this.chatRoomService.createOrFindPrivateRoom(otherUserId))
      this.chatRoomService.EmitEvent(doc._id)
      if (callback) {
        callback(null, doc)
      }

    } catch (error) {
      if (callback) {
        callback(error.err, null)
      }

    }
    return doc


  }

  initializeComp() {

    this.activatedRoute.params.subscribe(async params => {

      let chatroom_id = null;

      this.CurrentUser = this.LS.getUserValue()


      if (!params.type) {
        this.router.navigateByUrl("/app/home")
        return
      }


      if (params.type == "chat") {
        chatroom_id = params.id
        this.privateChat = false
      } else if (params.type == "privateChat") {
        this.privateChat = true
        let result: Chatroom = await this.createOrFindPrivateChatRoom(params.id)
        this.otherUser = await lastValueFrom(this.userService.getUser(params.id))
        if (result) {
          console.log("private room joined");
          chatroom_id = result._id
          this.socket.getSocket().emit("joinRoom", chatroom_id)
        }

      } else {
        this.router.navigateByUrl("/app/home")
        return
      }

      if (chatroom_id) {

        if (this.chatRoom) {
          //set date required to retrive unseen messages -- for previous channel 
          this.unreadMessagesService.setLastSeenMessage(this.chatRoom._id, new Date())
        }
        //set date required to retrive unseen messages -- for new channel 
        this.unreadMessagesService.setLastSeenMessage(chatroom_id, new Date())
        this.loadingMessages = true
        this.chatRoom = await lastValueFrom(this.chatRoomService.getRoomByid(chatroom_id))


        this.chatRoom.members.forEach(message => {
          this.addUserMetaData(message)
        })

        this.chatRoom.messages.forEach(message => {
          message.mine = (message.sender_id == this.CurrentUser._id.toString());
          message.appData = {}

        })
        this.loadingMessages = false

        this.scrollToBottom(100)

      }

    });


  }




  socketIoEvents() {
    this.socket.getSocket().on("message", async (message: Message, roomId: string) => {



      if (roomId != this.chatRoom._id) {
        return
      }

      message.mine = (message.sender_id == this.CurrentUser._id.toString());
      message.appData = {}
      await this.addUserMetaData(message.sender_id)
      this.chatRoom.messages.push(message)
      this.scrollToBottom(100)
    })

    this.socket.getSocket().on("updateMessage", (message: Message, roomId: string) => {

      if (roomId != this.chatRoom._id) {
        return
      }
      message.mine = (message.sender_id == this.CurrentUser._id.toString());
      let index = this.chatRoom.messages.indexOf(this.chatRoom.messages.find(x => x._id == message._id))
      this.chatRoom.messages[index].textContent = message.textContent
    })



    this.socket.getSocket().on("deleteMessage", (message: Message, roomId: string) => {

      if (roomId != this.chatRoom._id) {
        return
      }

      let index = this.chatRoom.messages.indexOf(this.chatRoom.messages.find(x => x._id == message._id))
      this.chatRoom.messages.splice(index, 1)

    })
  }


  loadMessages() {

    let element: HTMLElement = this.messagesContainer.nativeElement.children[0]


    if (this.loadingMessages) {
      return
    }
    this.loadingMessages = true
    this.scrollInterrupted=false;

    lastValueFrom(this.chatRoomService.getSlicedMessages(this.chatRoom._id, this.chatRoom.messages.length, 20)).then(async (data) => {

     
      
      if (data.messages.find(x => x._id == this.chatRoom.messages[0]._id)) {
        let index = data.messages.indexOf(data.messages.find(x => x._id == this.chatRoom.messages[0]._id))
        data.messages = <[Message]>data.messages.slice(0, index)
      }

      data.messages.forEach(message => {
        message.mine = (message.sender_id == this.CurrentUser._id.toString());
        message.appData = {}
      })
      this.chatRoom.messages.unshift(...data.messages)


      this.loadingMessages = false
      if (!this.scrollInterrupted) {
        await new Promise(x => setTimeout(x, 1))
        element.scrollIntoView({ behavior: "smooth" })
      }

    }).catch(err => { this.loadingMessages = false })
  }





  startMicInput() {
    this.micInput.initiateRecording()
  }

  stopMicInput() {
    this.micInput.stopRecording((blob) => {
      blob.name = "record.mp4"
      this.selectedFiles.push(blob)
    })


  }






  openFile() {
    let element: HTMLElement = document.getElementById("file2")
    element.click()
  }



  onFileChange(event) {
    let files = event.target.files
    var imageType = /image.*/;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.match(imageType)) {

        let fileReader: FileReader = new FileReader()
        fileReader.readAsDataURL(files[i])
        fileReader.onload = (e) => {
          files[i].path = e.target.result
          this.selectedFiles.push(files[i])
        }
      } else {

        this.selectedFiles.push(files[i])
      }
    }
  }

  deleteFile(file) {
    let index = this.selectedFiles.indexOf(this.selectedFiles.find(x => x.name == file.name))

    if (index != -1) {
      this.selectedFiles.splice(index, 1)
    }

  }


  async addUserMetaData(id) {
    if (!Object.keys(this.chatMembers).includes(id)) {

      let data = await lastValueFrom(this.userService.getUser(id))
      this.chatMembers[id] = data


    }
  }

  getUserData(id): User {
    return this.chatMembers[id]
  }

  async pushMessage() {

    if (this.textInput.replace(" ", "") == "" && this.selectedFiles.length == 0) {
      return
    }

    let newMessage = new Message()
    newMessage.send_date = new Date()
    newMessage.textContent = this.textInput
    newMessage.sender_id = this.CurrentUser._id.toString();

    if (this.selectedFiles.length > 0) {
      newMessage.hasAttachment = true

      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.selectedFiles[i].progress = true
        let fileResponse = await lastValueFrom(this.fileUtility.uploadFile(this.selectedFiles[i]))
        let attachment: Attachment = new Attachment(
          this.selectedFiles[i].name,
          fileResponse.webContentLink,
          this.selectedFiles[i].type,
          this.selectedFiles[i].name.split('.').pop(),
          this.selectedFiles[i].size)
        if (newMessage.attachmentents) {
          newMessage.attachmentents.push(attachment)
        } else {
          newMessage.attachmentents = [attachment]
        }

        this.selectedFiles[i].progress = false
      }
    }
    this.socket.getSocket().emit("message", newMessage, this.chatRoom._id)
    if (this.privateChat) {
      let index = this.chatRoom.members.findIndex(id => id != this.LS.getUserValue()._id)
      let userId = this.chatRoom.members[index]
      this.socket.getSocket().emit("privateMessage", this.LS.getUserValue()._id, userId, this.chatRoom._id)
    }



    this.clear()

  }

  clear() {
    this.textInput = "";
    this.selectedFiles = []
  }

  getFileType(mimeType) {
    return mimeType.split('/')[0] == "image" || mimeType.split('/')[0] == 'audio' || mimeType.split('/')[0] == 'video' ? mimeType.split('/')[0] : 'file'
  }
  async scrollToBottom(delay: number = 0) {
    await new Promise(x => setTimeout(x, delay))
    try {
      this.myScrollContainer.nativeElement.scrollTo({ top: this.myScrollContainer.nativeElement.scrollHeight, behavior: 'smooth' });
    } catch (error) {
    }
  }

  selectMessage(index: number) {

    this.chatRoom.messages[index].appData.selected = true
  }

  CopyToClipBoard(index) {
    navigator.clipboard.writeText(this.chatRoom.messages[index].textContent.toString())
  }

  deSelectMessage(index: number) {

    this.chatRoom.messages[index].appData.selected = false
  }

  openMenu(index: number) {

    this.chatRoom.messages[index].appData.showMenu = true


  }

  addEmoji(event) {

    console.log(event);
    this.textInput += (" " + event.emoji.native + " ")

  }
  toggleEmojisPanel(event) {



    if (event.target.nodeName == "svg" || event.target.nodeName == "div") {
      this.showEmojiPanel = !this.showEmojiPanel;

    }

  }
  closeMenu(index: number) {
    this.chatRoom.messages[index].appData.showMenu = false
  }
  cancelEdit(index: number) {
    this.chatRoom.messages[index].textContent = this.chatRoom.messages[index].appData.tempText
    this.chatRoom.messages[index].appData.edit = false

  }

  saveMessage(index) {

    this.chatRoom.messages[index].appData.edit = false
    let newMessage = this.chatRoom.messages[index]
    this.socket.getSocket().emit("updateMessage", newMessage, this.chatRoom._id)
  }

  deleteMessage(index) {

    let deletedMessage = this.chatRoom.messages[index]
    this.closeMenu(index)
    this.socket.getSocket().emit("deleteMessage", deletedMessage, this.chatRoom._id)

  }

  editMessage(i) {
    this.chatRoom.messages[i].appData.tempText = this.chatRoom.messages[i].textContent
    this.chatRoom.messages[i].appData.edit = true
  }

}
