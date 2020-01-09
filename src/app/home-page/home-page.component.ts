import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  riders = ['Rider','Ride Taker'];
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
