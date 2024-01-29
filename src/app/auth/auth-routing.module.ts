import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { LoginComponent } from './components/login/login.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { Constant } from '../shared/utils/Constant';

const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: Constant.APP_TITLE + 'Login'
    },
    {
        path: 'verify-account',
        component: VerifyAccountComponent,
        title: Constant.APP_TITLE + 'Verify Account'
    },
    {
        path: 'reset-password',
        component: UpdatePasswordComponent,
        title: Constant.APP_TITLE + 'Reset Password'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
