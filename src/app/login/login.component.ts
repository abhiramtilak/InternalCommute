import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { User } from '../user';
import { Router } from '@angular/router';

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

    if( sessionStorage.getItem('role') != null ){
      if( sessionStorage.getItem('role') === 'Rider' ){
        this.router.navigate(['/rider']);
      }else if(sessionStorage.getItem('role') === 'RideTaker' ){
        this.router.navigate(['/ridertaker']);
      }else if( sessionStorage.getItem('role') === 'admin' ){
        this.router.navigate(['/admin']);
      }      
    }

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
    
    this.preparesessionObject(res.body);

    if( res.body.role != null ){
      if( res.body.role === 'Rider' ){
        this.router.navigate(['/rider']);
      }else if( res.body.role === 'RideTaker' ){
        this.router.navigate(['/ridertaker']);
      }else if( res.body.role === 'admin' ){
        this.router.navigate(['/admin']);
      }      
    }
  }, err => {
      this.errorMessage = "Please enter valid credentials.";
      this.errorMessageStatus = true;
      console.log(err);
  });
  }
  preparesessionObject(user){
    sessionStorage.setItem('userId', user.userId);
    sessionStorage.setItem('availableseats',user.availableSeats);
    sessionStorage.setItem('email',user.email);
    sessionStorage.setItem('firstName',user.firstName);
    sessionStorage.setItem('homeAddress',user.homeAddress);
    sessionStorage.setItem('lastName',user.lastName);
    sessionStorage.setItem('mobileNumber',user.mobileNumber);
    sessionStorage.setItem('officeAddress',user.officeAddress);
    sessionStorage.setItem('password',user.password);
    sessionStorage.setItem('role',user.role);
    sessionStorage.setItem('vehicle',user.vehicle);
  }

}
