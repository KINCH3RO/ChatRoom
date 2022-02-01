import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friend-main-container',
  templateUrl: './friend-main-container.component.html',
  styleUrls: ['./friend-main-container.component.scss']
})
export class FriendMainContainerComponent implements OnInit {

  constructor(private LS: LocalStorageService,
    private socketService: SocketManagerService,
    private userService: UserService,
    private eventEmitterService: EventEmitterService) { }

  @Input() user: User
  @Input() search: boolean = false
  @Input() friendStatus = null;
  @Output() reloadFriendList = new EventEmitter()
  contextMenuPosition = [0, 0]
  showContextMenu = false;
  user_id: string = null
  userPesence: Observable<any>

  ngOnInit(): void {


    this.user_id = this.LS.getUserValue()._id
    this.userPesence = this.userService.getUserPresence(this.user._id)

    this.socketService.getSocket().on("userPresence", (userId, presence) => {
      if (userId == this.user._id) {
        this.userPesence = of(presence)
      }
    })
  }
  setContextMenuVisibility(value) {
    this.showContextMenu = value
  }

  emitReload() {
    this.reloadFriendList.emit(this.user._id)
  }

  openMenu(eve) {
    eve.preventDefault()
    let X = eve.clientX
    let Y = eve.clientY
    this.contextMenuPosition = [X, Y]
    this.setContextMenuVisibility(true)
  }
  async acceptFriendRequest(receiverId) {
    try {
      let currentUserId = this.LS.getUserValue()._id
      await lastValueFrom(this.userService.acceptFriendRequest(receiverId))
      this.socketService.getSocket().emit("sendFriendRequest", currentUserId, receiverId)
      this.eventEmitterService.showPopUP({ message: 'Friend Request send', type: 'success' })

      this.emitReload()
    } catch (error) {
      this.eventEmitterService.showPopUP({ message: error.error, type: 'error' })

    }


  }

  async removeFriendRequest(receiverId) {
    try {
      let currentUserId = this.LS.getUserValue()._id
      await lastValueFrom(this.userService.removeFriendRequest(receiverId))
      this.socketService.getSocket().emit("sendFriendRequest", currentUserId, receiverId)
      this.eventEmitterService.showPopUP({ message: 'Friend removed', type: 'success' })

      this.emitReload()
    } catch (error) {
      this.eventEmitterService.showPopUP({ message: error.error, type: 'error' })

    }


  }




}
