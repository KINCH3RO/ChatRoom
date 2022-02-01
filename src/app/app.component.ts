import { Component, OnInit, Renderer2 } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { SocketManagerService } from './services/socket-manager.service';

import { UtilityService } from './services/utility.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private utilityService: UtilityService, private render: Renderer2,private LS:LocalStorageService) { }
  ngOnInit(): void {
    this.utilityService.SetThemeAutomatically(this.render)
  
  }

  title = 'ChatRoom';

  drop(event){
    event.preventDefault()
    console.log(event);
    
  }

  dragHandler(event){
    event.preventDefault()
    console.log(event);
    
  }

  
}
