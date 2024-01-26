import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../core/guard/auth.guard';
import { Constant } from '../shared/utils/Constant';

const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {roles: [{name: Constant.SYS_ADMIN}]}
    }
];

@NgModule({
  imports: [RouterModule.forRoot(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
