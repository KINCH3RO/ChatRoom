import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { trigger, transition, state, style, animate } from '@angular/animations'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  animations: [
    trigger('fadeState', [
      state('show', style({

        opacity: 1

      })),
      state('hide', style({
        opacity: 0


      })),
      transition('show=>hide', animate("600ms ease-out"))
    ])
  ]
})
export class SplashScreenComponent implements OnInit,OnDestroy {

  fadeState = 'show';
  show = true;
  sideBarLoaded = false
  additionalSideBarloaded = false
  subscription:Subscription


  constructor(private utilityService: UtilityService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  isDark() {
    return this.utilityService.isDark()

  }
  ngOnInit(): void {
    this.subscription = this.utilityService.contentLoaded.subscribe(async componentName => {
      if (componentName == "additionalSideBar") {
        this.sideBarLoaded = true
      }

      if (componentName == "sideBar") {
        this.additionalSideBarloaded = true
      }
      if (this.sideBarLoaded && this.additionalSideBarloaded) {
        await new Promise(x=>setTimeout(x,2000))

        this.fadeState = 'hide'
      }

    })
  }

  setVisibility(eve) {
    if (eve.toState == 'hide') {
      this.show = false
    }
  }


}
