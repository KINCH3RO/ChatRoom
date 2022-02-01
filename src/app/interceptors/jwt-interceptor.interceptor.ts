import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { SocketManagerService } from '../services/socket-manager.service';
const TOKEN_HEADER_KEY = 'Authorization'
@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private LS: LocalStorageService, private router: Router, private socket: SocketManagerService) { }



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.LS.getTokenValue()
    if (!token) {

      this.router.navigateByUrl("/signin")

      return next.handle(request);
    }
    if (token != null) {
      request = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(request);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorInterceptor,
    multi: true
  }
];