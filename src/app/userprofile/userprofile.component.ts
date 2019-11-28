import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;
  riderValues: Boolean;
  backUrl: String;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {
    debugger
      if( sessionStorage.getItem('role') === 'Rider' ){
        this.backUrl = '/rider';
      }else if( sessionStorage.getItem('role') === 'RideTaker' ){
        this.backUrl = '/ridertaker';
      }else if( sessionStorage.getItem('role') === 'admin' ){
        this.backUrl = '/admin';
      }
    this.riderValues = true;
    this.profileForm = this.formBuilder.group({
      firstName: [sessionStorage.getItem('firstName'), Validators.required],
      lastName: [sessionStorage.getItem('lastName'), Validators.required],
      email: [sessionStorage.getItem('email'), [Validators.required,Validators.email]],
      mobileNumber: [sessionStorage.getItem('mobileNumber'), [Validators.required]],
      role: [sessionStorage.getItem('role')],
      officeAddress: [sessionStorage.getItem('officeAddress'), Validators.required],
      homeAddress: [sessionStorage.getItem('homeAddress'), Validators.required],
      password: [sessionStorage.getItem('password'), [Validators.required,Validators.minLength(6)]],
      vehicle: [sessionStorage.getItem('vehicle')],
      availableSeats: [sessionStorage.getItem('availableseats')]

    });
  }

  get f() { return this.profileForm.controls; }

  submitProfileUpdate(){
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
  }
}
onChange(newValue) {
  if( newValue === 'Rider' ){
    this.riderValues = true;
  }else{
    this.riderValues = false;
  }

  this.loginService.updateDetails(this.profileForm.value).subscribe((res) => {
    alert('update success');
  }, err => {
      alert('update failed');
  });

}
  ngOnInit() {
  }

}
