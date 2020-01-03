import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RideTakerService } from '../services/ride-taker.service';
import { Rides } from '../rides';

@Component({
  selector: 'app-ride-taker',
  templateUrl: './ride-taker.component.html',
  styleUrls: ['./ride-taker.component.css']
})
export class RideTakerComponent implements OnInit {
  allRides;
  constructor(private formBuilder: FormBuilder,
    private rideTakerService: RideTakerService) { 

      this.rideTakerService.getAvailableRides().subscribe((res) => {
        for( let i=1; i<=res.body.length; i++ ){
          res.body[i-1].rideDateTime = new Date(res.body[i-1].rideDateTime); 
          res.body[i-1].rowId = i;
          res.body[i-1].rideTakerId = sessionStorage.getItem('userId');
        }
        this.allRides = res.body;
  }, err => {
        alert('Some thing went Wrong. Please try again later!!');
  });

  }

  ngOnInit() {
  }

  sendRideRequest(rideData){

    this.rideTakerService.sendRideRequest(rideData).subscribe((res) => {
      
      if( res.body.responseCode === "OK" ){
        alert(res.body.responseMessage);
        window.location.reload();
      }else{
        alert(res.body.responseMessage);
        window.location.reload();
      }
    }, err => {
          alert('Some thing went Wrong. Please try again later!!');
          window.location.reload();
    });

  }

}
