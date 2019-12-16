import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordUpdateService {

  constructor(private httpClient: HttpClient) { }

  updatePassword(passwordDetails): Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/login/updatePassword', passwordDetails, { observe : 'response' });
  }
}
