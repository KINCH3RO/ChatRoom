import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnreadMessagesService {

  localstorageKey = "UNREAD_MESSAGES"
  suffix ="chatroom/"
  constructor(private httpClient:HttpClient) { }
  private getLastSeenMessagesDateObject() {
    let lastSeenMessagesObject = localStorage.getItem(this.localstorageKey)
    if (!lastSeenMessagesObject) {
      localStorage.setItem(this.localstorageKey, "{}")
      return {}

    }
    return JSON.parse(lastSeenMessagesObject)

  }


  setLastSeenMessage(chatroom_id, date) {
    let lastSeenMessagesObject = this.getLastSeenMessagesDateObject()

    lastSeenMessagesObject[chatroom_id] = date
    localStorage.setItem(this.localstorageKey, JSON.stringify(lastSeenMessagesObject))
    return lastSeenMessagesObject[chatroom_id]

  }

  getLastSeenMessage(chatroom_id) {
    let lastSeenMessagesObject = this.getLastSeenMessagesDateObject()
    let message_date = lastSeenMessagesObject[chatroom_id] ? lastSeenMessagesObject[chatroom_id] : undefined;
    return message_date
  }

  deleteLastSeenMessage(chatroom_id) {
    let lastSeenMessagesObject = this.getLastSeenMessagesDateObject()
    if (lastSeenMessagesObject[chatroom_id]) {
      delete lastSeenMessagesObject[chatroom_id]
      localStorage.setItem(this.localstorageKey, JSON.stringify(lastSeenMessagesObject))
    }

  }

  getUnseenMessageCountPerRoom(chatroom_id,lastSeenMessageDate){
    return this.httpClient.get<any>(environment.endPoint+this.suffix+`unseenMessagesCountPerRoom?chatroom_id=${chatroom_id}&date=${lastSeenMessageDate}`)
  }





}
