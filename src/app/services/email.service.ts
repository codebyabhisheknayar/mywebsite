import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private formUrl = 'https://formspree.io/f/xdorjjje';

  constructor(private http: HttpClient) { }

  sendEmail(formData: any): Observable<any> {
    return this.http.post<any>(this.formUrl, formData, { responseType: 'json' });
  }
}
