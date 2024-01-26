import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedRoutingModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }