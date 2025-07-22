import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Goal } from '../models/goal.model';
import { environment } from '../../../environments/environment.dev';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class GoalsService {
  constructor(private http: HttpClient) {}
  baseURL = environment.backendUrl;

  getCurrentUserGoals(): Observable<ApiResponse<Goal[]>> {
    return this.http
      .get<ApiResponse<Goal[]>>(`${this.baseURL}/goals`, {
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  getCurrentUserParentGoals(): Observable<ApiResponse<Goal[]>> {
    return this.http
      .get<ApiResponse<Goal[]>>(`${this.baseURL}/goals/parent-goals`, {
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  deleteGoal(id: string): Observable<ApiResponse<any>> {
    return this.http
      .delete<ApiResponse<any>>(`${this.baseURL}/goals/${id}`, {
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  updateGoal(id: string, body: Partial<Goal>): Observable<ApiResponse<any>> {
    return this.http
      .put<ApiResponse<any>>(`${this.baseURL}/goals/${id}`, body, {
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  createGoal(body: Partial<Goal>): Observable<ApiResponse<Goal>> {
    return this.http
      .post<ApiResponse<Goal>>(`${this.baseURL}/goals`, body, {
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  //***************************************************** public */
  getPublicGoals(): Observable<ApiResponse<Goal[]>> {
    return this.http
      .get<ApiResponse<Goal[]>>(`${this.baseURL}/public-goals`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }
}
