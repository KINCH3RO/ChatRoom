import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-message-drop-down',
  templateUrl: './message-drop-down.component.html',
  styleUrls: ['./message-drop-down.component.scss']
})
export class MessageDropDownComponent implements OnInit {

  constructor() { }

  @Output() OnDelete = new EventEmitter()
  @Output() OnEdit = new EventEmitter()
  @Output() onCopy = new EventEmitter()
  @Output() OnAction = new EventEmitter()

  edit(){
    this.OnEdit.emit('')
    this.OnAction.emit('')
  }
  deleteM(){
    this.OnDelete.emit('')
    this.OnAction.emit('')
  }

  copyMessage(){
    this.onCopy.emit('')
    this.OnAction.emit('')
  }
  ngOnInit(): void {
  }

}
