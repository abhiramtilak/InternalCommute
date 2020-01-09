import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;
  apiResponse: String;
  errorMessage: String;
  errorMessageStatus: Boolean;
  successMessageStatus: Boolean;
  successMessage: String;
  riderValues: Boolean;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
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

      this.riderValues = false;
      this.registrationForm = this.formBuilder.group({
      firstName: ['abhiram', Validators.required],
      lastName: ['tilak', Validators.required],
      email: ['test@test.com', [Validators.required,Validators.email]],
      mobileNumber: ['8106632929', [Validators.required]],
      role: ['RideTaker'],
      officeAddress: ['office address', Validators.required],
      homeAddress: ['home address', Validators.required],
      password: ['123456', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['123456', Validators.required],
      vehicle: ['2'],
      availableSeats: ['1']
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  ngOnInit() {
  }
  get f() { return this.registrationForm.controls; }


  submitRegistration(){
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
  }
    this.registerService.registerUser(this.registrationForm.value).subscribe((res) => {
      this.successMessageStatus = true;
      this.errorMessageStatus = false;
      this.successMessage = "Registration Successfull. Please login to continue.";
    }, err => {
        this.errorMessage = err.error;
        this.errorMessageStatus = true;
        console.log(err);
    });
  }
  onChange(newValue) {
    if( newValue === 'Rider' ){
      this.riderValues = true;
    }else{
      this.riderValues = false;
    }
}
}
