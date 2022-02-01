import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Chatroom } from '../models/chatroom';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private httpClient:HttpClient) { }
  @Output() roomAdded = new EventEmitter<string>()

  EmitEvent(event){
    this.roomAdded.emit(event)
  }

  suffix ="chatroom/"

  createRoom(values){
   return this.httpClient.post<Chatroom  | any>(environment.endPoint+this.suffix+"create",values)
  }

  createOrFindPrivateRoom(userId){
    return this.httpClient.post<Chatroom  | any>(environment.endPoint+this.suffix+"createPrivateRoom",{userId})
  }

  DeleteRoom(value){
    return this.httpClient.delete(environment.endPoint+this.suffix+"delete?chatroom_id="+value)
  }

 

  getRoomsByMember(userid,privateRoom=false){
    return this.httpClient.get(environment.endPoint+this.suffix+"bymember?member_id="+userid+"&private="+privateRoom)
  }

  getCurrentUserRooms(privateRoom=false){
    return this.httpClient.get<Chatroom[]>(environment.endPoint+this.suffix+"currentUser"+"?private="+privateRoom)
  }

  getRoomByid(room_id,compact=false){
    return this.httpClient.get<Chatroom>(environment.endPoint+this.suffix+"?room_id="+room_id+"&compact="+compact)
  }

  getSlicedMessages(roomId,arraylength,numberOfElement){
    return this.httpClient.get<Chatroom>(environment.endPoint+this.suffix+`getMessages?room_id=${roomId}&length=${arraylength}&elementCounts=${numberOfElement}`)
  }

  updateChatroom(values){
    return this.httpClient.put<Chatroom>(environment.endPoint+this.suffix+"update",values)
  }

  joinChatRoom(chatroom_id){
    
    return this.httpClient.put<Chatroom>(environment.endPoint+this.suffix+"addMember",{chatroom_id})
  }
}
