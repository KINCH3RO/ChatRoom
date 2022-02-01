import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, lastValueFrom, last } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivateChild {
  constructor(private LS: LocalStorageService, private authService: AuthService, private router: Router) { }
  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let token = this.LS.getTokenValue()

    if (!token) {
      this.LS.cleanUserValues()
      this.router.navigateByUrl("/signin")

    }
    try {
      let response = await lastValueFrom(this.authService.isAuthorized());
    } catch (error) {
      this.router.navigateByUrl("/signin")
    }

    if (!this.LS.getUserValue()) {
      try {
        let userValues = await lastValueFrom(this.authService.getPayLoad());
        this.LS.setUserValue(userValues)
      } catch (error) {
        this.LS.cleanUserValues()
        this.router.navigateByUrl("/signin")

      }
    }
    return true

  }




}
