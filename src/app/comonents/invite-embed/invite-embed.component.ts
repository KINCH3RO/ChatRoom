import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Chatroom } from 'src/app/models/chatroom';
import { ChatroomService } from 'src/app/services/chatroom.service';

@Component({
  selector: 'app-invite-embed',
  templateUrl: './invite-embed.component.html',
  styleUrls: ['./invite-embed.component.scss']
})
export class InviteEmbedComponent implements OnInit {

  constructor(private chatroomService: ChatroomService) { }
  @Input() url: string;
  @Input() mine:boolean=false;
  chatRoom: Observable<Chatroom> =null;
  async ngOnInit() {
    if (this.url) {
      let regex = /[a-f\d]{24}/g
      let chatroomId = this.url.match(regex)

      if (chatroomId) {
        try {
          this.chatRoom = this.chatroomService.getRoomByid(chatroomId)
        } catch (error) {

        }

      }


    }
  }

}
