import { Component, Input, OnInit } from '@angular/core';
import { Chatroom } from 'src/app/models/chatroom';

@Component({
  selector: 'app-content-interface',
  templateUrl: './content-interface.component.html',
  styleUrls: ['./content-interface.component.scss']
})
export class ContentInterfaceComponent implements OnInit {

  constructor() { }

  @Input() chatRoom:Chatroom;
  ngOnInit(): void {
   
    
  }

}
