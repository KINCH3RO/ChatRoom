import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FileResponse } from 'src/app/models/file-response';
import { User } from 'src/app/models/user';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FileUtilityService } from 'src/app/services/file-utility.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(private fileUtility: FileUtilityService,
    private LS: LocalStorageService,
    private userService: UserService,
    private eventEmitterService: EventEmitterService) { }

  @ViewChild("file") private FileElement: ElementRef
  userData: User = null
  username = ""
  email = ""
  password = ""
  photoUrl = ""
  thumbnailUrl = ""
  uploadingFile = false
  changed = false

  ngOnInit(): void {
    let id = this.LS.getUserValue()._id

    lastValueFrom(this.userService.getUser(id, false)).then(data => {
      this.userData = data
      this.username = this.userData.username
      this.email = this.userData.email
      this.thumbnailUrl = this.userData.thumbnailUrl


    })
  }

  clickFile() {
    this.FileElement.nativeElement.click()
  }

  Cancel(){
    this.username=this.userData.username
    this.email=this.userData.email
    this.thumbnailUrl=this.userData.thumbnailUrl
  }

  checkChanges(){

    if(this.username !=this.userData.username || this.email!=this.userData.email){
      this.changed=true
    }else{
      this.changed=false
    }

  }
  async uploadFile(event) {
    let file = event.target.files[0]
    let fileResponse: FileResponse = null
    if (!file) {
      return
    }
    if (this.uploadingFile) {
      return
    }
    try {
      this.uploadingFile = true
      fileResponse = await lastValueFrom(this.fileUtility.uploadFile(file))
      this.thumbnailUrl = fileResponse.thumbnailLink
      this.photoUrl = fileResponse.webContentLink
      this.uploadingFile = false
      this.changed=true
    } catch (error) {
      this.uploadingFile = false
      this.changed=false
    }

  }

  save() {

    if (this.uploadingFile) {
      this.eventEmitterService.showPopUP({ message: 'Your picture still being uploaded', type: "warning" })
      return
    }
    let updateObject = {}
    updateObject["user_id"] = this.LS.getUserValue()._id
    updateObject["username"] = this.username
    updateObject["email"] = this.email
    updateObject["password"] = this.password
    updateObject["thumbnailUrl"] = this.thumbnailUrl
    updateObject["photoUrl"] = this.photoUrl

    lastValueFrom(this.userService.updateUser(updateObject)).then(data => {
      this.eventEmitterService.showPopUP({ message: 'Your info has been saved', type: "success" })
    }).catch(err => {
      if (err.error = "wrong password") {
        this.eventEmitterService.showPopUP({ message: 'Wrong password', type: "error" })
      } else {
        this.eventEmitterService.showPopUP({ message: 'Error occured,try again later', type: "error" })
      }

    })
  }

}
