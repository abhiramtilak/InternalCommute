import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RiderService } from '../services/rider.service';

@Component({
  selector: 'app-ride-requests',
  templateUrl: './ride-requests.component.html',
  styleUrls: ['./ride-requests.component.css']
})
export class RideRequestsComponent implements OnInit {

  rideRequests: any;

  constructor(  public dialogRef: MatDialogRef<RideRequestsComponent>,
                private riderService: RiderService
    ) { 

    this.riderService.getRideRequests(sessionStorage.getItem('userId')).subscribe((res) => {
      if( res.body.length > 0 ){
        for( let i=1; i<=res.body.length; i++ ){
          res.body[i-1].rideDate = new Date(res.body[i-1].rideDate); 
          res.body[i-1].rowId = i;
        }
        this.rideRequests = res.body;
      }else{
        alert('No active ride requests are available!!');
      }
    }, err => {
      alert('Some thing went wrong. Please try again later!!')          
    });

  }

  ngOnInit() {
  }

  closeRequests(): void {
    this.dialogRef.close();
  }

}
