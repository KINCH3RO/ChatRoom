import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FreindRequest } from 'src/app/models/freind-request';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-drop-down',
  templateUrl: './user-drop-down.component.html',
  styleUrls: ['./user-drop-down.component.scss']
})
export class UserDropDownComponent implements OnInit {

  constructor(private userService: UserService,
    private LS: LocalStorageService,
    private eventEmitterService: EventEmitterService,
    private socketService: SocketManagerService,
    private router: Router) { }
  @Output() OnSend = new EventEmitter()
  @Output() OnProfile = new EventEmitter()
  @Output() OnBlock = new EventEmitter()
  @Output() OnUnblock = new EventEmitter()
  @Output() OnAdd = new EventEmitter()
  @Output() OnRemove = new EventEmitter()
  @Output() OnAction = new EventEmitter()
  @Input() userId: string
  isFriend = false
  isBlocked = false
  loaded =false;


  ngOnInit(): void {

    this.getFriendStatus()
  }

  async getFriendStatus() {
    try {
      let userStatus:FreindRequest = await lastValueFrom( this.userService.getFriendStatus(this.userId))
      this.isFriend = (userStatus.status == "accepted")
      this.isBlocked = (userStatus.blocked == true)
      this.loaded=true
  
    } catch (error) {
      this.isFriend=false
      this.isBlocked=false
      this.loaded=true
    }


  }
  send() {


    this.router.navigateByUrl("/app/private/privateChat/" + this.userId)
    this.OnSend.emit(this.userId)
    this.OnAction.emit(this.userId)
  }

  profile() {
    this.OnProfile.emit(this.userId)
    this.OnAction.emit(this.userId)
  }


  async remove() {
    await this.removeFriend(this.userId)

    this.OnRemove.emit(this.userId)
    this.OnAction.emit(this.userId)
  }

  async add() {
    await this.sendFreindRequest(this.userId)

    this.OnAdd.emit(this.userId)
    this.OnAction.emit(this.userId)
  }

  block() {
    this.OnBlock.emit(this.userId)
    this.OnAction.emit(this.userId)
  }
  unblock() {
    this.OnUnblock.emit(this.userId)
    this.OnAction.emit(this.userId)
  }

  async sendFreindRequest(receiverId) {
    try {
      let currentUserId = this.LS.getUserValue()._id;
      await lastValueFrom(this.userService.sendFreindRequest(receiverId))

      this.socketService.getSocket().emit("sendFriendRequest", currentUserId, receiverId)

      this.eventEmitterService.showPopUP({ message: 'Friend Request send', type: 'success' })
    } catch (error) {
      this.eventEmitterService.showPopUP({ message: error.error, type: 'error' })
    }


  }

  async removeFriend(receiverId) {
    try {
      let currentUserId = this.LS.getUserValue()._id;
      await lastValueFrom(this.userService.removeFriendRequest(receiverId))
      this.socketService.getSocket().emit("sendFriendRequest", currentUserId, receiverId)
      this.eventEmitterService.showPopUP({ message: 'Friend removed', type: 'success' })
    } catch (error) {
      this.eventEmitterService.showPopUP({ message: error.error, type: 'error' })
    }


  }
}
