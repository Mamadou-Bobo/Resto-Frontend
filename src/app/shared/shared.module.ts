import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { SharedRoutingModule } from './shared-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [ForbiddenComponent, SnackbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedRoutingModule,
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedRoutingModule,
    SnackbarComponent
  ],
})
export class SharedModule
 {}
