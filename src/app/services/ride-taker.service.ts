import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideTakerService {

  constructor(private httpClient: HttpClient) { }

  getAvailableRides(): Observable<any>{
    return this.httpClient.get<any>('http://localhost:8080/rides/getRides', { observe : 'response' });
  }

}
