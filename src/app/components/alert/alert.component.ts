import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(private eventEmitter: EventEmitterService) { }

  ngOnInit(): void {
    if (this.eventEmitter.subsVar==undefined) {    
      this.eventEmitter.subsVar = this.eventEmitter.    
      invokeFirstComponentFunction.subscribe((parameters:object) => {    
        this.show(parameters);    
      });    
    }    
  }
  toShow=false;
  popUpType="success"
  message="test message";

  show(parameters:any){
    
    
    this.toShow=true;
    this.message=parameters.message;
    this.popUpType=parameters.type;
    if(parameters.time==null){
      setTimeout(()=>this.toShow=false,3000)
    }else{
      setTimeout(()=>this.toShow=false,parameters.time)
    }
 
    
  }

}
