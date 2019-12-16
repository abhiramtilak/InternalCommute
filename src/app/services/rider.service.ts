import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  constructor(private httpClient: HttpClient) { }

  postRide(ride){
    return this.httpClient.post<any>('http://localhost:8080/rides/postRide', ride, { observe : 'response' });
  }
}
