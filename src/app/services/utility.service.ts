import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private localStorageService: LocalStorageService, private httpClient: HttpClient) { }

  ADAPTIVE_THEME = false;
  @Output() contentLoaded = new EventEmitter()
  setDarkModStatus(value, render: Renderer2) {
    if (value) {
      if (!document.querySelector("body").className.includes('dark')) {
        render.addClass(document.body, "dark")
      }
      this.localStorageService.setDarkValue("true")
    } else {
      render.removeClass(document.body, "dark")
      this.localStorageService.setDarkValue("false")
    }
  }

  private IsSystemDark() {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      return true;
    } else {
      return false;
    }
  }

  isDark() {
    return document.querySelector("body").className.includes('dark')
  }

  SetThemeAutomatically(render: Renderer2) {
    if (this.ADAPTIVE_THEME) {
      this.setDarkModStatus(this.IsSystemDark(), render)
      return;
    }
    let isDark = this.localStorageService.getDarkValue() == "true"

    this.setDarkModStatus(isDark, render)

  }

  toggleDark(render: Renderer2) {
    let isDark = this.localStorageService.getDarkValue() == "true"
    this.setDarkModStatus(!isDark, render)
    return !isDark


  }

  getYoutubeVideoData(id) {
    return this.httpClient.get(environment.endPoint+ "utils/videoInfo/" + id)
  }









}
