import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { Chatroom } from 'src/app/models/chatroom';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { UnreadMessagesService } from 'src/app/services/unread-messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friend-container',
  templateUrl: './friend-container.component.html',
  styleUrls: ['./friend-container.component.scss']
})
export class FriendContainerComponent implements OnInit, OnDestroy {

  constructor(
    private LS: LocalStorageService,
    private userService: UserService,
    private socketService: SocketManagerService,
    private unreadMessageService: UnreadMessagesService) { }

  @Input() privateChatroom: Chatroom | any;
  user: Observable<any>
  showContextMenu = false
  selected: boolean = false
  left = 0
  top = 0
  messageCount: number = 0
  userPesence: Observable<any>

  CheckIfSelected(event) {

    if (this.selected == false && event == true) {
      this.messageCount = 0
    }
    this.selected = event
  }

  ngOnDestroy(): void {

  }
  async ngOnInit() {
    if (this.privateChatroom) {
      //unseen messages count setup
      let date = this.unreadMessageService.getLastSeenMessage(this.privateChatroom._id) || this.privateChatroom.created_Date;
      if (date) {
        let countObject = await lastValueFrom(this.unreadMessageService.getUnseenMessageCountPerRoom(this.privateChatroom._id, date))
        this.messageCount = countObject.count
      }

      let index = this.privateChatroom.members.findIndex(id => id != this.LS.getUserValue()._id)
      if (index == -1) {
        return
      }

      let otherMemberId = this.privateChatroom.members[index]

      this.userPesence = this.userService.getUserPresence(otherMemberId)
      this.user = this.userService.getUser(otherMemberId)
      if (this.privateChatroom.new) {
        this.messageCount += 1
      }

      this.socketService.getSocket().on("privateMessage", (sender, chatroom_id) => {
        if (chatroom_id != this.privateChatroom._id) {
          return
        }
        if (!this.selected) {
          this.messageCount += 1
        }
      })

      this.socketService.getSocket().on("userPresence", (userId, presence) => {
        if (userId == otherMemberId) {
          this.userPesence = of(presence)
        }
      })
    }


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

}
