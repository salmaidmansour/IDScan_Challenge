// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth'; // Base URL

  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  sendOtp(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `email=${email}`;
    return this.http.post(`${this.apiUrl}/send-otp`, body, { headers, responseType: 'text' });
  }
  

  verifyOtp(email: string, otp: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `email=${email}&otp=${otp}`;
    return this.http.post(`${this.apiUrl}/verify-otp`, body, { headers, responseType: 'text' });
  }
  
}

