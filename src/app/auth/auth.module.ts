import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';

@NgModule({
  declarations: [
    LoginComponent,
    VerifyAccountComponent,
    UpdatePasswordComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
