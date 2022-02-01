import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/user';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { UnreadMessagesService } from 'src/app/services/unread-messages.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit,AfterViewInit {


  constructor(
    private chatRoomService: ChatroomService,
    private unreadMessageService: UnreadMessagesService,
    private userService: UserService,
    private LS: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socketService: SocketManagerService,
    private utilityService: UtilityService) { }
  ngAfterViewInit(): void {
    this.utilityService.contentLoaded.emit('sideBar')
  }

  user: User = null
  showDropDown = false;
  newPrivateMessage = false
  privateMessagesSelected = false;
  chatRoomMessagesSelected: boolean;
  newChatRoomMessage: boolean;




  isActive(instruction: string): boolean {
    return this.router.isActive(instruction, false)
  }

  isDark() {
    return this.utilityService.isDark()
  }

  redirect(url) {
    let completion = ""
    let currentUrl = this.router.url.toString()
    if (!url.includes("settings")) {
      if (currentUrl.includes("/app/chatrooms") || currentUrl.includes("/app/private")) {
        completion = currentUrl.replace("/app/chatrooms", "")
        completion = completion.replace("/app/private", "")
      }


      if (completion == "") {
        completion = "/home"
      }
    }


    this.router.navigateByUrl(url + completion).then(x => {
      if (url.includes("/app/private") && this.privateMessagesSelected == false) {
        this.newPrivateMessage = false
      }

      if (url.includes("/app/chatrooms") && this.chatRoomMessagesSelected == false) {
        this.newChatRoomMessage = false
      }

      this.checkIfSelected()


    })

  }



  checkIfSelected() {
    this.privateMessagesSelected = this.isActive("/app/private")
    this.chatRoomMessagesSelected = this.isActive("/app/chatrooms")



  }

  async checkForNewMessage(privateRoom ) {
    let chatRooms = await lastValueFrom(this.chatRoomService.getCurrentUserRooms(privateRoom))
    for (let i = 0; i < chatRooms.length; i++) {
      //unseen messages count setup
      let date = this.unreadMessageService.getLastSeenMessage(chatRooms[i]._id) || chatRooms[i].created_Date;
      if (date) {
        let countObject = await lastValueFrom(this.unreadMessageService.getUnseenMessageCountPerRoom(chatRooms[i]._id, date))
        if (countObject.count > 0) {
           if(privateRoom){
            this.newPrivateMessage=true;
           }else{
            this.newChatRoomMessage=true
           }
          
          break;

        }
      }

    }
  }


  ngOnInit(): void {
    this.checkIfSelected()
    this.checkForNewMessage(true)
    this.checkForNewMessage(false)
    
    lastValueFrom(this.userService.getUser(this.LS.getUserValue()._id)).then(data => {
      this.user = data
    })

    this.socketService.getSocket().on("message", (message, roomid, privateRoom) => {
      if (!this.chatRoomMessagesSelected && this.router.url.split("chat/")[1] != roomid && !privateRoom) {

        this.newChatRoomMessage = true;
      }
    })
    this.socketService.getSocket().on("privateMessage", (sender, chatroom_id) => {

      if (!this.privateMessagesSelected && this.router.url.split("privateChat/")[1] != sender) {

        this.newPrivateMessage = true;
      }

    })


  }

  setDropDownVisibility(value) {
    this.showDropDown = value
  }




}
