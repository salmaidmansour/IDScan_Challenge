import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}

  verifyOtp(email: string, otp: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `email=${email}&otp=${otp}`;
    return this.http.post<any>('http://localhost:8080/api/v1/auth/verify-otp', body, { headers });
  }
}
