import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Goal } from '../models/goal.model';
import { environment } from '../../../environments/environment.dev';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  baseURL = environment.backendUrl;

  register(body: {
    email: string;
    password: string;
  }): Observable<ApiResponse<{ message: string; userId: string }>> {
    return this.http
      .post<ApiResponse<{ message: string; userId: string }>>(
        `${this.baseURL}/auth/register`,
        body
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  login(body: {
    email: string;
    password: string;
  }): Observable<ApiResponse<{ access_token: string }>> {
    return this.http
      .post<ApiResponse<{ access_token: string }>>(
        `${this.baseURL}/auth/login`,
        body
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }
}
