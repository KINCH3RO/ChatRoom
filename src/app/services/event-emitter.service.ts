import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  constructor() { }

  invokeFirstComponentFunction = new EventEmitter();    
  subsVar?: Subscription;    
    
 
    
  showPopUP(parameters:any) {    
    this.invokeFirstComponentFunction.emit(parameters);    
  }    
}
