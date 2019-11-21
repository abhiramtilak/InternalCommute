import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor( private httpClient: HttpClient ) { }

  registerUser(user: String): Observable<String>{
    return this.httpClient.post<String>('http://localhost:8080/register/user', user);
  }
}
