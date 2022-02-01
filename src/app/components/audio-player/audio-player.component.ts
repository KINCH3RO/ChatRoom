import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {

  @ViewChild('inner') innerSlider: ElementRef;
  @ViewChild('pin') pin: ElementRef;
  @ViewChild('audio') audio: ElementRef;

  @ViewChild('slider_volume') slider_volume: ElementRef;
  
  @ViewChild('wholeElement') host: ElementRef;



  @Input() type: string = "audio";
  @Input() src: String = null;


  isPlaying: boolean = false
  timeStamp: number
  currentTimeStamp: number
  volume: number=1
  showVolumeMenu = false
  fullScreen = false
  


  public mouseDown: boolean = false
  constructor(private cd: ChangeDetectorRef) {
  
   }
  ngAfterViewInit(): void {
  
    this.audio.nativeElement.onloadedmetadata = (data) => {


      this.timeStamp = this.audio.nativeElement.duration
      this.currentTimeStamp = this.audio.nativeElement.currentTime
     

    }
    this.audio.nativeElement.onplay = () => {
      this.isPlaying = true

    }
    this.audio.nativeElement.onpause = () => {
      this.isPlaying = false
    }

    this.audio.nativeElement.ontimeupdate = () => {
      this.currentTimeStamp = this.audio.nativeElement.currentTime
      let value = this.currentTimeStamp * 100 / this.timeStamp
      this.innerSlider.nativeElement.style = "width :" + value + "%"
      this.pin.nativeElement.style = "left :" + value + "%"

    }

    this.volume = this.audio.nativeElement.volume
    this.slider_volume.nativeElement.value =this.volume*100
   


  }

  ngOnInit(): void {
    this.cd.detectChanges()


  }

  toggleFullScreen() {
    this.fullScreen = !this.fullScreen
    if (this.fullScreen && this.host.nativeElement.requestFullscreen) {
      this.host.nativeElement.requestFullscreen()
    }
    if (!this.fullScreen && document.exitFullscreen) {
      document.exitFullscreen()
    }

  }
  showVolume(event) {



    if (event.target.nodeName == "svg" || event.target.nodeName == "path") {
      this.showVolumeMenu = !this.showVolumeMenu
    }
    if (this.showVolumeMenu) {

    }

  }
  onOff() {
    this.isPlaying ? this.pause() : this.play()
  }

  play() {
    this.audio.nativeElement.play()
  }
  pause() {
    this.audio.nativeElement.pause()
  }

  changeEvent(event) {


    let target = event.target.className.includes("slider") ? event.target : event.target.offsetParent;

    let value = (event.clientX - this.getOffset(target)[0]) / target.offsetWidth * 100
    if (value > 100 || value < 0) {
      return
    }
    this.innerSlider.nativeElement.style = "width :" + value + "%"
    this.pin.nativeElement.style = "left :" + value + "%"

    this.audio.nativeElement.currentTime = (this.timeStamp * value / 100)
    this.currentTimeStamp = (this.timeStamp * value / 100)

  }

  getOffset(target) {
    let left = target.offsetLeft;
    let top = target.offsetTop;
    let currentTarget = target.offsetParent

    while (currentTarget.localName != "body") {
      left += currentTarget.offsetLeft
      top += currentTarget.offsetTop
      currentTarget = currentTarget.offsetParent;

    }
    return [left, top]
  }

  changeAudioEvent(event) {


    let value =event.target.value

    this.audio.nativeElement.volume = (value / 100)
  }



}
