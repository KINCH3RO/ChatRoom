import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  suffix ="auth/"


  login(values: any) {
    return this.httpClient.post<any>(environment.endPoint+this.suffix + "login", values)
  }

  getPayLoad(){
    return this.httpClient.get<User>(environment.endPoint+this.suffix + "getPayload")

  }

  isAuthorized(){
    return this.httpClient.get(environment.endPoint+this.suffix + "isAuthorized",{responseType:'text'})

  }
}
