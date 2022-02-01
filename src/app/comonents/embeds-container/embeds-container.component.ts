import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-embeds-container',
  templateUrl: './embeds-container.component.html',
  styleUrls: ['./embeds-container.component.scss']
})
export class EmbedsContainerComponent implements OnInit {

  constructor() { }
  @Input() messageText = null
  @Input() mine =null
  formattedUrls = null
  ngOnInit(): void {

    this.replaceText()
  }

  replaceText() {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}(\.|:)?[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/gm;
    let foundUrls: any = this.messageText.match(regex)



    if (!foundUrls) {
      return
    }


    foundUrls = Array.from(new Set(foundUrls))





    this.formattedUrls = foundUrls.map((url: string) => {

      if (this.isInviteURL(url)) {
        return {
          type: "invite",
          url: url
        }
      }
      if (this.isYoutubeURL(url)) {
        return {
          type: "youtube",
          url: url
        }
      }

      return {
        type: "none",
        url: url
      }

    })

    
  }

  isInviteURL(url: string) {
    origin = location.origin.replace("http://", "").replace("https://", "")
    let InviteRegex = new RegExp("https?://" + origin + "/app/invite/([a-f\\d]{24}$)", "gm")
    if (url.match(InviteRegex)) {
      return true
    }
    return false
  }

  isYoutubeURL(url: string) {
    let youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?/
    if (url.match(youtubeRegex)) {
      return true
    } else {
      return false
    }

  }

  isTwitchURL(url:string){
    let twitchRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?/
    if (url.match(twitchRegex)) {
      return true
    } else {
      return false
    }

  }

}
