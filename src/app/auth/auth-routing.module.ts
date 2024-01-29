import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { LoginComponent } from './components/login/login.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'verify-account',
        component: VerifyAccountComponent
    },
    {
        path: 'reset-password',
        component: UpdatePasswordComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
