import { Component, OnInit } from '@angular/core';
import { RiderService } from '../services/rider.service';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.css']
})
export class MyRidesComponent implements OnInit {

  allRides: any;
  dataAvailable = true;

  constructor(private riderService: RiderService) {

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
