import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RideTakerService } from '../services/ride-taker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-taker',
  templateUrl: './ride-taker.component.html',
  styleUrls: ['./ride-taker.component.css']
})
export class RideTakerComponent implements OnInit {
  allRides;
  dataAvailable = false;
  constructor(private formBuilder: FormBuilder,
    private rideTakerService: RideTakerService,
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

      this.rideTakerService.getAvailableRides().subscribe((res) => {
        if( res.body.length > 0 ){
          this.dataAvailable = true;
        for( let i=1; i<=res.body.length; i++ ){
          res.body[i-1].rideDateTime = new Date(res.body[i-1].rideDateTime); 
          res.body[i-1].rowId = i;
          res.body[i-1].rideTakerId = sessionStorage.getItem('userId');
        }
        this.allRides = res.body;
      }
  }, err => {
        alert('Some thing went Wrong. Please try again later!!');
  });

  }

  ngOnInit() {
  }

  sendRideRequest(rideData){

    this.rideTakerService.sendRideRequest(rideData).subscribe((res) => {
      rideData.userEmail = sessionStorage.getItem('email');
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
