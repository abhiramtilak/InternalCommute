import { Component, OnInit } from '@angular/core';
import { RiderService } from '../services/rider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.css']
})
export class MyRidesComponent implements OnInit {

  allRides: any;
  dataAvailable = true;

  constructor(private riderService: RiderService,
    private router: Router) {

    if( sessionStorage.getItem('role') != null ){
      if( sessionStorage.getItem('role') === 'Rider' ){
        this.router.navigate(['/rider']);
      }else if(sessionStorage.getItem('role') === 'RideTaker' ){
        this.router.navigate(['/ridertaker']);
      }else if( sessionStorage.getItem('role') === 'admin' ){
        this.router.navigate(['/admin']);
      }      
    }

    this.riderService.myRides(sessionStorage.getItem('userId')).subscribe((res) => {
      
      if( res.body.length > 0 ){
        this.dataAvailable = false;
        for( let i=1; i<=res.body.length; i++ ){
          res.body[i-1].rideDate = new Date(res.body[i-1].rideDate); 
          res.body[i-1].rowId = i;
        }
        this.allRides = res.body;
      }else{
        
      }

    }, err => {

      alert('Some thing went wrong. Please try again later!!');
     
    });

   }

  ngOnInit() {
  }

  cancelRide(rideDetails){
    this.riderService.CancelRide(rideDetails.rideId).subscribe((res) => {
        
        alert('Ride cancelled successfully!!');
        window.location.reload();

    }, err => {

      alert('Some thing went wrong. Please try again later!!');
     
    });

  }

}
