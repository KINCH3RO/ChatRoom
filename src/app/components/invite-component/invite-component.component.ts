import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Chatroom } from 'src/app/models/chatroom';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-invite-component',
  templateUrl: './invite-component.component.html',
  styleUrls: ['./invite-component.component.scss']
})
export class InviteComponentComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventEmitterService: EventEmitterService,
    private chatRoomService: ChatroomService) { }


  async ngOnInit() {
    let chatroomiD: string = this.activatedRoute.snapshot.params.chatroom_id


    if (!chatroomiD.match(/^[a-f\d]{24}$/i) || !chatroomiD) {
      this.eventEmitterService.showPopUP({ message: "ChatRoom not found", type: "error" })
      this.router.navigateByUrl("/app/chatrooms/home")
    }

    try {
      let chatRoom: Chatroom = await lastValueFrom(this.chatRoomService.joinChatRoom(chatroomiD))
      this.router.navigateByUrl("/app/chatrooms/chat/"+chatRoom._id)
    } catch (error) {
      this.eventEmitterService.showPopUP({ message: "ChatRoom not found", type: "error" })
      this.router.navigateByUrl("/app/chatrooms/home")
    }




  }

}
