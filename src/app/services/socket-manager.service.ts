import { Injectable } from '@angular/core';
import io from 'socket.io-client'
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class SocketManagerService {



  private socket = null;
  constructor(private LS: LocalStorageService) {

  }

  getSocket() {

    if (!this.LS.getUserValue()) {
      console.error("USER ID not provided to connect to the socket")

    }

    if (!this.socket) {

      this.socket = io('http://localhost:3000', {
        query: {
          userId: this.LS.getUserValue()._id
        }
      });
      
      this.socket.on('connection', function (data: any) {
        console.log("Connected to the socket succesfully");
      });
    }
    if (this.socket.disconnected) {
      this.socket.connect()
    }



    return this.socket;
  }



  disconnect() {
    this.socket.disconnect()
  }


}
