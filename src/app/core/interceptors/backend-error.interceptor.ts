import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable()
export class BackendErrorInterceptor implements HttpInterceptor {
  private toast = inject(ToastService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errMsg = 'An unknown error occurred';

        if (error.error?.message) {
          errMsg = error.error.message;
        } else if (error.status === 0) {
          errMsg = 'No connection to server';
        } else if (error.status >= 500) {
          errMsg = 'Internal server error';
        }

        this.toast.error(errMsg);

        return throwError(() => error);
      })
    );
  }
}
