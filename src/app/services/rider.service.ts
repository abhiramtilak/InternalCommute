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

  getRideRequests(userId): Observable<any>{
    return this.httpClient.get<any>('http://localhost:8080/rides/getRideRequests?userId='+userId, { observe : 'response' });
  }

  myRides(userId): Observable<any>{
    return this.httpClient.get<any>('http://localhost:8080/rides/myRides?userId='+userId, { observe : 'response' });
  }

  CancelRide(rideId): Observable<any>{
    return this.httpClient.delete<any>('http://localhost:8080/rides/cancelRide?rideId='+rideId, { observe : 'response' });
  }

  acceptRideRequest(requestId): Observable<any>{
    return this.httpClient.get<any>('http://localhost:8080/rides/acceptRequest?requestId='+requestId, { observe : 'response' });
  }

  rejectRideRequest(requestId): Observable<any>{
    return this.httpClient.get<any>('http://localhost:8080/rides/rejectRequest?requestId='+requestId, { observe : 'response' });
  }

}
