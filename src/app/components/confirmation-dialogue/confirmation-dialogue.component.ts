import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialogue',
  templateUrl: './confirmation-dialogue.component.html',
  styleUrls: ['./confirmation-dialogue.component.scss']
})
export class ConfirmationDialogueComponent implements OnInit {

  constructor() { }

  @Input() headerText: string = ""
  @Input() text: string = ""
  @Input() targetText = null
  @Input() buttonText: string = ""
  @Input() show = false
  value = ""




  @Output() OnAccept = new EventEmitter()
  @Output() OnCancel = new EventEmitter()

  accept() {
    if (this.targetText != null) {
      if (this.value == this.targetText.name) {
        this.show = false
        this.OnAccept.emit('')
      }
    } else {
      this.show = false
      this.OnAccept.emit('')
    }


  }

  cancel() {
    this.show = false
  }
  ngOnInit(): void {
  }

}
