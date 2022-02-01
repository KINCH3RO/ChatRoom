import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Chatroom } from 'src/app/models/chatroom';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FileUtilityService } from 'src/app/services/file-utility.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SocketManagerService } from 'src/app/services/socket-manager.service';

@Component({
  selector: 'app-create-room-form',
  templateUrl: './create-room-form.component.html',
  styleUrls: ['./create-room-form.component.scss']
})
export class CreateRoomFormComponent implements OnInit, OnChanges {

  constructor(private fb: FormBuilder,
    private eventEmitterService: EventEmitterService,
    private chatRoomService: ChatroomService,
    private fileUtility: FileUtilityService,
    private LS: LocalStorageService

  ) { }

  @Output() reload = new EventEmitter<string>();

  @Input() show;
  @Input() chatRoom: Chatroom
  editMode = false


  photoUrl = null;


  progress = false
  photoProgress = false;
  createRoomForm: FormGroup = this.fb.group({
    created_Date:[new Date(),[]],
    photoUrl: ['', []],
    thumbnailUrl: ['', []],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    private:[false,[]]
   
  })


  ngOnChanges(changes: SimpleChanges): void {
    if (this.chatRoom) {
      this.photoUrl = this.chatRoom.thumbnailUrl
      this.name.setValue(this.chatRoom.name)
      this.description.setValue(this.chatRoom.description)
      this.editMode = true
    } else {
      this.editMode = false
      this.clear()
    }
  }

  clear() {
    this.photoUrl = ""
    this.createRoomForm.setValue({
      created_Date:new Date(),
      photoUrl: null,
      thumbnailUrl: null,
      name: null,
      description: null,
      private:false
 
    })
  }

  ngOnInit(): void {


  }




  get name() {
    return this.createRoomForm.get('name');
  }

  get description() {
    return this.createRoomForm.get('description');
  }

  openFile() {

    let fileElement: HTMLElement = document.getElementById('file') as HTMLElement;
    fileElement.click()

  }

  onFileSelected(event) {
    this.photoProgress = true
    let File: File = event.target.files[0]
    this.fileUtility.uploadFile(File).toPromise().then(data => {
      this.photoProgress = false
      this.photoUrl = data.thumbnailLink;
      this.createRoomForm.get('photoUrl').setValue(data.webContentLink)
      this.createRoomForm.get('thumbnailUrl').setValue(data.thumbnailLink)
    }).catch(err => { console.log(err); this.photoProgress = false })


  }

  saveRoom() {
    if (!this.createRoomForm.valid) {
      return
    }

    this.progress = true
    let updateObject = this.createRoomForm.value
    updateObject.room_id = this.chatRoom._id
    lastValueFrom(this.chatRoomService.updateChatroom(updateObject)).then(data => {
      this.eventEmitterService.showPopUP({ message: "Chat Room Information Saved", type: "success" })
      this.progress = false;
      this.show = false;
      this.clear()
      this.reload.emit("lol")


    }).catch(err => { this.progress = false })


  }
  createRoom() {
    
   

    if (!this.createRoomForm.valid) {
      return
    }
    this.progress = true;

    this.chatRoomService.createRoom(this.createRoomForm.value).toPromise().then(data => {

      this.eventEmitterService.showPopUP({ message: "Chat Room Created", type: "success" })
      this.progress = false;
      this.show = false;
      this.clear()
      this.reload.emit("lol")

    }).catch(err => {
      this.progress = false;
    })


  }
}
