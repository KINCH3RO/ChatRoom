
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Chatroom } from 'src/app/models/chatroom';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { UnreadMessagesService } from 'src/app/services/unread-messages.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-chat-room-container',
  templateUrl: './chat-room-container.component.html',
  styleUrls: ['./chat-room-container.component.scss']
})
export class ChatRoomContainerComponent implements OnInit, OnDestroy {

  constructor(
    private socket: SocketManagerService,
    private userService: UserService,
    private unreadMessageService: UnreadMessagesService) { }


  @Output() ShowEdit = new EventEmitter()
  @Output() ShowDelete = new EventEmitter()

  @Input() chatroom: Chatroom;
  @Input() index: number
  lastMessage: any = {}
  messageCount: number = 0
  selected: boolean = false
  showContextMenu = false
  left = 0
  top = 0

  async ngOnInit() {
    //unseen messages count setup
    let date = this.unreadMessageService.getLastSeenMessage(this.chatroom._id) || this.chatroom.created_Date;
    if (date) {
     let countObject= await lastValueFrom(this.unreadMessageService.getUnseenMessageCountPerRoom(this.chatroom._id, date))
     this.messageCount = countObject.count
    }



    this.socket.getSocket().emit("joinRoom", this.chatroom._id)

    this.socket.getSocket().on("message", async (message: Message, roomId: string) => {

      if (roomId != this.chatroom._id) {
        return
      }
      await this.addUserMetaData(message.sender_id, message.send_date, message.textContent)
      if (!this.selected) {
        this.messageCount += 1
      }


    })

    let lastEntry = this.chatroom.messages.pop()
    if (!lastEntry) {
      return
    }
    await this.addUserMetaData(lastEntry.sender_id, lastEntry.send_date, lastEntry.textContent)


  }

  ngOnDestroy(): void {

  }


  CheckIfSelected(event) {
    if (this.selected == false && event == true) {
      this.messageCount = 0
    }
    this.selected = event
  }

  openEditModal() {

    this.ShowEdit.emit(JSON.stringify(this.chatroom))
  }
  openDeleteModal() {
    this.ShowDelete.emit(JSON.stringify(this.chatroom))
  }



  setPosition(eve) {
    eve.preventDefault()


    this.top = eve.clientY
    this.left = eve.clientX

    this.ShowContextMenu(true)


  }
  ShowContextMenu(value) {
    this.showContextMenu = value
  }

  async addUserMetaData(sender_id, send_date, message) {
    let data: User = await lastValueFrom(this.userService.getUser(sender_id))
    this.lastMessage["name"] = data.username
    this.lastMessage["text"] = message;
    this.lastMessage["send_date"] = send_date;
  }



  CopyInviteToClipBoard() {
    navigator.clipboard.writeText(location.origin + "/app/invite/" + this.chatroom._id)
  }

}
