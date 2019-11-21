import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { RegisterService } from '../services/register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;
  apiResponse: String;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
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
    this.registerService.registerUser(JSON.stringify(this.registrationForm.value)).subscribe(res => this.apiResponse = res);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationForm.value));
  }

}
