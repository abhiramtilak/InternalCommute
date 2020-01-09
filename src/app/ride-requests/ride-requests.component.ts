import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RiderService } from '../services/rider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-requests',
  templateUrl: './ride-requests.component.html',
  styleUrls: ['./ride-requests.component.css']
})
export class RideRequestsComponent implements OnInit {

  rideRequests: any;
  dataAvailable = true;

  constructor(  public dialogRef: MatDialogRef<RideRequestsComponent>,
                private riderService: RiderService,
                private router: Router
    ) { 

      if( sessionStorage.getItem('role') != null ){
        if( sessionStorage.getItem('role') === 'Rider' ){
          this.router.navigate(['/rider']);
        }else if(sessionStorage.getItem('role') === 'RideTaker' ){
          this.router.navigate(['/ridertaker']);
        }else if( sessionStorage.getItem('role') === 'admin' ){
          this.router.navigate(['/admin']);
        }      
      }

    this.riderService.getRideRequests(sessionStorage.getItem('userId')).subscribe((res) => {
      if( res.body.length > 0 ){
        this.dataAvailable = false;
        for( let i=1; i<=res.body.length; i++ ){
          res.body[i-1].rideDate = new Date(res.body[i-1].rideDate); 
          res.body[i-1].rowId = i;
        }
        this.rideRequests = res.body;
      }else{
        //alert('No active ride requests are available!!');
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

  acceptRequest(rideDetails){
    this.riderService.acceptRideRequest(rideDetails.requestId).subscribe((res) => {
      alert('Ride Request Accepted Successfully. You will recieve Ride taker details through email.');
      window.location.reload();
      
    }, err => {
      alert('Some thing went wrong. Please try again later!!')          
    });
  }

  declineRequest(rideDetails){
    this.riderService.rejectRideRequest(rideDetails.requestId).subscribe((res) => {
      alert('Ride Request Declined.');
      window.location.reload();
      
    }, err => {
      alert('Some thing went wrong. Please try again later!!')          
    });
  }

}
