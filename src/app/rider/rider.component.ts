import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timingSafeEqual } from 'crypto';

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
  constructor( 
    private formBuilder: FormBuilder
    ) { 
      this.previousDate = false;
      this.previousTime = false;
      this.before10Min = false;
      this.riderForm = this.formBuilder.group({
        vehicle: [sessionStorage.getItem('vehicle'), Validators.required],
        vehicleNumber: ['TS00GR0000', Validators.required],
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
  alert('form submitted successfully');
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

}
