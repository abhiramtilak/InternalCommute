import { Component, OnInit } from '@angular/core';
import { MustMatch } from '../_helpers/must-match.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordUpdateService } from '../services/password-update.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  passwordUpdateFrom: FormGroup;
  submitted = false;
  successMessageStatus = false;
  errorMessageStatus = false;
  message = '';
  backUrl: String;

  constructor(private formBuilder: FormBuilder,
              private passwordUpdateService: PasswordUpdateService
      ) { 
        if( sessionStorage.getItem('role') === 'Rider' ){
          this.backUrl = '/rider';
        }else if( sessionStorage.getItem('role') === 'RideTaker' ){
          this.backUrl = '/ridertaker';
        }else if( sessionStorage.getItem('role') === 'admin' ){
          this.backUrl = '/admin';
        }
    this.passwordUpdateFrom = this.formBuilder.group({
      oldPassword: ['', [Validators.required,Validators.minLength(6)]],
      newPassword: ['', [Validators.required,Validators.minLength(6)]],
      newConfirmPassword: ['',[Validators.required,Validators.minLength(6)]],
      userId: [sessionStorage.getItem('userId'),[]]
    }, {
      validator: MustMatch('newPassword', 'newConfirmPassword')
  });

  }

  get f() { return this.passwordUpdateFrom.controls; }

  ngOnInit() {
  }

  updatePassword(){
    this.submitted = true;
    if (this.passwordUpdateFrom.invalid) {
      return;
    }
    this.passwordUpdateService.updatePassword(this.passwordUpdateFrom.value).subscribe((res) => {
    this.successMessageStatus = true;
    this.errorMessageStatus = false;
    this.message = 'Password updated successfully !!';
      
    }, err => {
      this.errorMessageStatus = true;
      this.successMessageStatus = false;
      this.message = err.error;
    });
  }

}
