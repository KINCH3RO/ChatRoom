import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-current-user-dropdown',
  templateUrl: './current-user-dropdown.component.html',
  styleUrls: ['./current-user-dropdown.component.scss']
})
export class CurrentUserDropdownComponent implements OnInit {

  constructor(
    private socketService:SocketManagerService,
    private utilityService: UtilityService, 
    private render: Renderer2,
    private LS:LocalStorageService,
    private router:Router) { }
  dark = false
  user = null
  ngOnInit(): void {
    this.user=this.LS.getUserValue()
    this.dark = this.utilityService.isDark()
  }
  toggleDark() {
    this.dark = this.utilityService.toggleDark(this.render)
  }

  signOut(){

    this.LS.cleanUserValues()
    this.socketService.disconnect()
    this.router.navigateByUrl("/signin")
  }

}
