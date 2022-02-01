import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
@Injectable({
  providedIn: 'root'
})
export class MicInputService {

  title = 'micRecorder';
  //Lets declare Record OBJ
  record;
  blob;
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url;
  error;
  constructor(private domSanitizer: DomSanitizer) {
  }
  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
   * Start recording.
   */

  
  initiateRecording() {

    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  /**
   * Will be called automatically.
   */
  successCallback(stream) {
    var options = {
      
      mimeType: "audio/mp4",
      numberOfAudioChannels: 1,
      sampleRate: 44100,
      bufferSize: 4096
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  /**
   * Stop recording.
   */
  stopRecording(callback) {
    this.recording = false;
    
    this.record.stop(callback);
  }
  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    this.blob=blob
    // console.log("blob", blob);
    // console.log("url", this.url);
  }
  /**
   * Process Error.
   */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }
}
