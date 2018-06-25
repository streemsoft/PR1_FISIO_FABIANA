import { ToastModule } from 'ng2-toastr';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { SignupComponent } from './signup/signup.component';
import { Signup2Component } from './signup2/signup2.component';

import { AuthenticationRoutes } from './authentication.routing';
import { NgModel, FormsModule } from '@angular/forms';


@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    RouterModule.forChild(AuthenticationRoutes),
    ToastModule.forRoot()
  ],
  declarations: [
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    LockComponent,
    Login2Component,
    Signup2Component
  ]
})

export class AuthenticationModule {}
