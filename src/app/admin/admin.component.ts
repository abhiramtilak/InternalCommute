import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) {
    if( sessionStorage.getItem('role') != null ){
      if( sessionStorage.getItem('role') === 'Rider' ){
        this.router.navigate(['/rider']);
      }else if(sessionStorage.getItem('role') === 'RideTaker' ){
        this.router.navigate(['/ridertaker']);
      }else if( sessionStorage.getItem('role') === 'admin' ){
        this.router.navigate(['/admin']);
      }      
    }
   }

  ngOnInit() {
  }

}
