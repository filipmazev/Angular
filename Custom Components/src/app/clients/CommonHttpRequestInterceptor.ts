
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpStatusCode
} from '@angular/common/http';

import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

/** Inject With Credentials into the request */
@Injectable()
export class CommonHttpRequestInterceptor implements HttpInterceptor {

  constructor(
    public router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({
      withCredentials: true
    });

    return next.handle(req)
       .pipe(
         catchError((error) => {
           this.handleError(error);
           return throwError(error);
         })
       )
  }

  private handleError(err: HttpErrorResponse): Observable<any> {

    if (err.status === Number(HttpStatusCode.Unauthorized)) {
      this.router.navigateByUrl('/login', );
      localStorage.setItem('isLogged', '0');
      //return throwError(err);
    }

    if (err.status === Number(HttpStatusCode.Forbidden)) {

    }

    return throwError(err);
  }
}
