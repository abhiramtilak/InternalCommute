import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router'

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

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { 
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      mobileNumber: ['', [Validators.required]],
      role: ['Rider'],
      officeAddress: ['', Validators.required],
      homeAddress: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
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
    this.registerService.registerUser(this.registrationForm.value).subscribe(res => {
      if (res != null) {
        if( res.status == 200 ){
          this.router.navigate(['/login'] );
        }else{
          this.errorMessage = "Some thing went Wrong please try again!!"
        }
      }
    });
  }



}
