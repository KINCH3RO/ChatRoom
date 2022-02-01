import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Chatroom } from 'src/app/models/chatroom';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatroom-drop-down',
  templateUrl: './chatroom-drop-down.component.html',
  styleUrls: ['./chatroom-drop-down.component.scss']
})
export class ChatroomDropDownComponent implements OnInit {

  constructor(private userService: UserService) { }
  isMine = null



  @Input() chatRoom: Chatroom;

  @Output() OnDelete = new EventEmitter()
  @Output() OnEdit = new EventEmitter()
  @Output() OnInviteLink = new EventEmitter()
  @Output() OnLeave = new EventEmitter()
  @Output() OnAction = new EventEmitter()
  async ngOnInit() {
    try {
      let user: User = await lastValueFrom(this.userService.getUser(null, true))
      if (user) {
        this.isMine = (this.chatRoom.owner == user._id)
      }

    } catch (error) {

    }

  }
  edit(event:Event) {
    event.stopPropagation()
    this.OnEdit.emit(this.chatRoom._id)
    this.OnAction.emit()
  }
  delete() {
    this.OnDelete.emit(this.chatRoom._id)
    this.OnAction.emit()
  }

  inviteLink() {
    this.OnInviteLink.emit(this.chatRoom._id)
    this.OnAction.emit()
  }

  leaveChatRoom(){
    this.OnLeave.emit(this.chatRoom._id)
    this.OnAction.emit()
  }
}
