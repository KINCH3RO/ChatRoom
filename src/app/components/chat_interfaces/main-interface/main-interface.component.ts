import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Chatroom } from 'src/app/models/chatroom';
import { AuthService } from 'src/app/services/auth.service';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-interface',
  templateUrl: './main-interface.component.html',
  styleUrls: ['./main-interface.component.scss']
})
export class MainInterfaceComponent implements OnInit {

  constructor(private authService: AuthService, private socketService: SocketManagerService) { }
  chatRoom: Chatroom = null;

  async ngOnInit() {
    try {
      
      let currentUser = await lastValueFrom(this.authService.getPayLoad())
      this.socketService.getSocket().emit("joinRoom", currentUser._id)
      this.socketService.getSocket().emit("Online", currentUser._id)

    } catch (error) {
     
     
    }
  }



  showChatRoom(event) {
    this.chatRoom = event;

  }
}
