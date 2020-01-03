import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RiderService } from '../services/rider.service';
import { RideRequestsComponent } from '../ride-requests/ride-requests.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.css']
})
export class RiderComponent implements OnInit {
  riderForm: FormGroup;
  submitted = false;
  previousDate: Boolean;
  previousTime: Boolean;
  before10Min: Boolean;
  successMessageStatus = false;
  errorMessageStatus = false;
  message : String;
  toAddress : String;
  fromAddress: String;

  constructor( 
    private formBuilder: FormBuilder,
    private riderService: RiderService,
    public dialog: MatDialog
    ) {

      this.previousDate = false;
      this.previousTime = false;
      this.before10Min = false;

      const dialogRef = this.dialog.open(RideRequestsComponent, {
        width: '85%',
        data: {}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

      this.riderForm = this.formBuilder.group({
        userId: [sessionStorage.getItem('userId')],
        vehicle: [sessionStorage.getItem('vehicle'), Validators.required],
        availableSeats: [sessionStorage.getItem('availableseats'), Validators.required],
        vehicleNumber: ['TS00GR0000', Validators.required],
        fromAddress: [sessionStorage.getItem('officeAddress'), Validators.required],
        toAddress: [sessionStorage.getItem('homeAddress'), Validators.required],
        rideDate: [this.currentDate(), Validators.required],
        rideTime: [this.currentTime(), Validators.required],
      });
    }
    get f() { return this.riderForm.controls; }

  ngOnInit() {
  }
  submitRide(){
    if( this.previousDate || this.previousTime || this.before10Min ){
      return;
    }
    this.submitted = true;
    
    if (this.riderForm.invalid) {
      return;
  }
  this.riderService.postRide(this.riderForm.value).subscribe((res) => {
        this.errorMessageStatus = false;
        this.successMessageStatus = true;
        this.message = 'ride posted successfully!!';
  }, err => {
        this.errorMessageStatus = true;
        this.successMessageStatus = false;
        this.message = 'Some thing went wrong. Please try again!!';
  });
}
onDateChange(date){
  if( this.riderForm.value.rideDate < this.currentDate() ){
    this.previousDate = true;
  }else{
    this.previousDate = false;
  }
}
onTimeChange(time){
    if( this.riderForm.value.rideDate == this.currentDate() ){
      if( time.split(':')[0] < new Date().getHours() ){
          this.previousTime = true;
          return;
      }else if( time.split(':')[0] == new Date().getHours() ){
          if( time.split(':')[1] < new Date().getMinutes()+10 ){
            this.before10Min = true;
            return;
          }
      }else{
          this.before10Min = false;
          this.previousTime = false;
      }
  }else{
    this.previousTime = false;
    this.before10Min = false;
  }
}
currentDate() {
  const currentDate = new Date();
  return currentDate.toISOString().substring(0,10);
}
currentTime(){
  const currentDate = new Date();
  return currentDate.getHours()+':'+ ((currentDate.getMinutes().toString().length == 1 ) ? '0'+currentDate.getMinutes().toString() : currentDate.getMinutes().toString()) ;
}
onSwapAddress(){
  if( this.riderForm.value.fromAddress === null || this.riderForm.value.fromAddress === '' || this.riderForm.value.toAddress === null || this.riderForm.value.toAddress === '' ){
    this.submitted = true;
    if (this.riderForm.invalid) {
      return;
    }
  }else{
    this.toAddress = this.riderForm.value.toAddress;
    this.fromAddress = this.riderForm.value.fromAddress;
    this.riderForm.controls['fromAddress'].setValue(this.toAddress);
    this.riderForm.controls['toAddress'].setValue(this.fromAddress);
  }
}

}
