import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-youtube-embed',
  templateUrl: './youtube-embed.component.html',
  styleUrls: ['./youtube-embed.component.scss']
})
export class YoutubeEmbedComponent implements OnInit {

  constructor(private utilityService:UtilityService) { }
  @Input() mine = false
  @Input() url: string = null
  videoData:Observable<any>
  src = null
  ngOnInit(): void {
    if (this.url) {
      let regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
      let youtubeId = regex.exec(this.url)[1]
      if(youtubeId){
        this.videoData = this.utilityService.getYoutubeVideoData(youtubeId)
        this.src = "https://www.youtube.com/embed/" + youtubeId
      }
      
    }




  }

}
