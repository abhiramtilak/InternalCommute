import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { User } from '../user';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  apiResponse: User;
  errorMessageStatus: Boolean;
  errorMessage: String;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['abhiram.veerapaneni@gmail.com', [Validators.required,Validators.email]],
      password: ['123456', [Validators.required,Validators.minLength(6)]],
    });
  }
  get f() { return this.loginForm.controls; }

  ngOnInit() {
  }
  submitLogin(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
  this.loginService.userDetails(this.loginForm.value).subscribe((res) => {
    debugger
    if( res.body.role != null ){
      this.router.navigate(['/rider']);
    }
  }, err => {
    debugger
      this.errorMessage = "Please enter valid credentials.";
      this.errorMessageStatus = true;
      console.log(err);
  });
  }

}
