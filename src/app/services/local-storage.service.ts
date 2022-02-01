import { Injectable, Renderer2 } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private DARK_KEY = "d157";
  private User_KEY = "USER"
  private TOKEN_key="jwt";

  setDarkValue(value: any) {
    localStorage.setItem(this.DARK_KEY, value.toString());

  }

  getDarkValue() {
    return localStorage.getItem(this.DARK_KEY)
  }

  setUserValue(value:any) {
    sessionStorage.setItem(this.User_KEY, JSON.stringify(value));

  }

  getUserValue() :User {
    let value = sessionStorage.getItem(this.User_KEY)

    if(value){
      return JSON.parse(value.toString())
    }
    return null
   
  }

  cleanUserValues(){
    localStorage.removeItem(this.TOKEN_key)
    sessionStorage.removeItem(this.User_KEY)
  }

  setTokenValue(value){
    localStorage.setItem(this.TOKEN_key, value !=null? value.toString():value);
  }
  getTokenValue() {
    return localStorage.getItem(this.TOKEN_key)
  }

}
