import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FreindRequest } from '../models/freind-request';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {

  }


  suffix = "user/"


  getUserPresence(userId) {
    return this.httpClient.get(environment.endPoint + this.suffix + "userPresence/?userId=" + userId,{responseType:'text'})
  }

  signup(values: any) {
    return this.httpClient.post<User | any>(environment.endPoint + this.suffix + "signup", values)
  }

  getFriendStatus(friend_id) {
    return this.httpClient.get<FreindRequest>(environment.endPoint + this.suffix + "friendStatus/?friend_id=" + friend_id)
  }
  getUser(id = null, compact = true) {
    return this.httpClient.get<User | any>(environment.endPoint + this.suffix + `?user_id=${id ? id : ''}&compact=${compact}`)
  }

  updateUser(value) {
    return this.httpClient.put<User | any>(environment.endPoint + this.suffix + "update", value)
  }

  search(searchQuery) {
    return this.httpClient.get<User[]>(environment.endPoint + this.suffix + "search?searchQuery=" + searchQuery)
  }

  sendFreindRequest(receiver_id) {
    let object = {

      receiver_id
    }
    return this.httpClient.post(environment.endPoint + this.suffix + "sendFriendRequest", object, { responseType: 'text' })
  }

  removeFriendRequest(otherUser) {
    let object = {
      otherUser
    }
    return this.httpClient.post(environment.endPoint + this.suffix + "removeFriendRequest", object, { responseType: 'text' })
  }

  acceptFriendRequest(otherUser) {
    let object = {
      otherUser
    }
    return this.httpClient.post(environment.endPoint + this.suffix + "acceptFriendRequest", object, { responseType: 'text' })
  }


}
