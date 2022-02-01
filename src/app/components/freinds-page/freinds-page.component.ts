import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { User } from 'src/app/models/user';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-freinds-page',
  templateUrl: './freinds-page.component.html',
  styleUrls: ['./freinds-page.component.scss']
})
export class FreindsPageComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private eventEmitterService: EventEmitterService,
    private LS: LocalStorageService,
    private socketService: SocketManagerService) { }

  currentPage = "all"

  searchUsers: Observable<User[]> = null
  userObservable: Observable<User> = null
  SearchRefreshBehavior = new BehaviorSubject<boolean>(true);
  FriendListRefreshBehavior = new BehaviorSubject<boolean>(true);

  contextMenuPosition = [0, 0]

  searchValue = ""
  selectedIndex = -1;
  user_id = null


  ngOnDestroy(): void {
    this.socketService.getSocket().off("sendFriendRequest")
    this.socketService.getSocket().off("removeFriendRequest")
    this.socketService.getSocket().off("acceptFriendRequest")
  }

  ngOnInit(): void {

    this.socketIOevents()
    this.user_id = this.LS.getUserValue()._id
    this.userObservable = this.FriendListRefreshBehavior.pipe(switchMap(x => this.userService.getUser(null, false).pipe(map(user => {

      user.friends.map(async friend => {
        try {
          friend.userData = await lastValueFrom(this.userService.getUser(friend.userId))
        } catch (error) {

        }
        return friend

      })
      return user

    }))))
  }

  socketIOevents() {
    this.socketService.getSocket().on("sendFriendRequest", (recId) => {

      this.reloadFriendsList()
    })

    this.socketService.getSocket().on("removeFriendRequest", (recId) => {

      this.reloadFriendsList()
    })

    this.socketService.getSocket().on("acceptFriendRequest", (recId) => {
      this.reloadFriendsList()
    })


  }

  setCurrentPage(value) {
    this.currentPage = value
  }



  search() {
    if (this.searchUsers == null && this.searchValue != "") {
      this.loadSearchUsers()
    } else {
      this.SearchRefreshBehavior.next(false)
    }


  }

  loadSearchUsers() {
    this.searchUsers = this.SearchRefreshBehavior.pipe(switchMap(x => this.userService.search(this.searchValue)))
  }

  reloadFriendsList() {

    this.FriendListRefreshBehavior.next(false)
  }










}
