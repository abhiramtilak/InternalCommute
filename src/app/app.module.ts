import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RiderComponent } from './rider/rider.component';
import { RideTakerComponent } from './ride-taker/ride-taker.component';
import { AdminComponent } from './admin/admin.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RideRequestsComponent } from './ride-requests/ride-requests.component';
import { DemoMaterialModule } from './material-module';
import { MyRidesComponent } from './my-rides/my-rides.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    RiderComponent,
    RideTakerComponent,
    AdminComponent,
    UserprofileComponent,
    PasswordChangeComponent,
    SignOutComponent,
    RideRequestsComponent,
    MyRidesComponent,
  ],
  imports: [
    BrowserModule,
    DemoMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'rider', component: RiderComponent},
      {path: 'ridertaker', component: RideTakerComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'profile', component: UserprofileComponent},
      {path: 'passwordChange', component: PasswordChangeComponent},
      {path: 'signOut', component: SignOutComponent},
      {path: 'myRides', component: MyRidesComponent}
    ]),
    BrowserAnimationsModule
  ],
  entryComponents: [
    RideRequestsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
