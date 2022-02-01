import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, Subscription } from 'rxjs';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { Chatroom } from 'src/app/models/chatroom';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-additional-side-bar',
  templateUrl: './additional-side-bar.component.html',
  styleUrls: ['./additional-side-bar.component.scss']
})
export class AdditionalSideBarComponent implements OnInit, OnDestroy,AfterViewInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatRoomService: ChatroomService,
    private LS: LocalStorageService,
    private eventEmitterService: EventEmitterService,
    private router: Router,
    private socketService: SocketManagerService,
    private utilityService:UtilityService) { }
  ngAfterViewInit(): void {
    this.utilityService.contentLoaded.emit("additionalSideBar");
  }

  showCreateForm = false;
  showDeleteForm = false;
  selectedChatRoom = null
  deleteText = "Type the name of the Chatroom to confirm"
  privateChat: boolean = false;

  ChatRooms: Chatroom[]
  privateChatRooms:Chatroom[]

  chatRoomsSub: Subscription
  PrivateChatRoomsSub: Subscription

  ngOnDestroy(): void {
    this.chatRoomsSub.unsubscribe()

  }
  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe(x => {

      this.privateChat = (x.sidebartype == "private")
      this.ChatRooms = null
      this.loadChatRooms()
    })


    this.socketService.getSocket().on("privateMessage", (sender, chatroom_id) => {
      this.pushPrivateChat(chatroom_id)
    })
    this.chatRoomService.roomAdded.subscribe(id => {
      this.pushPrivateChat(id)
    })

  }



  async showForm() {
    this.showCreateForm = false;
    await new Promise((x) => setTimeout((x), 1))
    this.showCreateForm = true;
  }

  loadChatRooms() {
    this.chatRoomsSub = this.chatRoomService.getCurrentUserRooms(false).subscribe(data => {
      this.ChatRooms = data;
    })

    this.PrivateChatRoomsSub = this.chatRoomService.getCurrentUserRooms(true).subscribe(data => {
      this.privateChatRooms = data;
    })


  }

  reload() {
    this.loadChatRooms()
  }

  async pushPrivateChat(chatRoomId) {
   
    if(!this.privateChatRooms ){
      this.privateChatRooms=[]
    }
    let index = this.privateChatRooms.findIndex(x => x._id == chatRoomId)
  
    if (index == -1) {
      try {
        let room = <any>await lastValueFrom(this.chatRoomService.getRoomByid(chatRoomId))
        room.new = true
        this.privateChatRooms.unshift(room)
      } catch (error) {

      }

    }

  }


  async ShowCreateForm() {
    this.selectedChatRoom = null
    await this.showForm()

  }

  async showEditForm(event) {
    this.selectedChatRoom = JSON.parse(event)
    console.log(this.selectedChatRoom);
    await this.showForm()

  }

  async ShowDeleteForm(event) {
    this.selectedChatRoom = JSON.parse(event)
    this.showDeleteForm = false;
    await new Promise((x) => setTimeout((x), 1))
    this.showDeleteForm = true;
  }


  DeleteChatRoom() {

    lastValueFrom(this.chatRoomService.DeleteRoom(this.selectedChatRoom._id)).then(data => {
      this.eventEmitterService.showPopUP({ message: "Chat Room Deleted", type: "success" })
      this.reload()
      this.router.navigateByUrl("/app/home")
    }).catch(err => {

    })
  }




}
