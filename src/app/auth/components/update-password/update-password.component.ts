import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { SnackBar } from '../../../shared/models/SnackBar';
import { ResetPasswordRequest } from '../../model/ResetPasswordRequest';
import { ResetPasswordService } from '../../services/reset-password.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePasswordComponent implements OnDestroy, AfterContentInit { 

  updatePasswordForm: FormGroup = this.formBuilder.group({
    code: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  confirmPassword: FormControl = new FormControl('', Validators.required);

  resetPasswordRequest!: ResetPasswordRequest;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
              private snackBarService: SnackBarService,
              private resetPasswordService: ResetPasswordService) {}

  ngAfterContentInit(): void {
    this.openSnackBar('An email has been sent to you with the code please check your account', 'snackbar-success');
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  protected resetPassword(): void {
    if(this.updatePasswordForm.valid) {
      this.resetPasswordRequest = this.updatePasswordForm.value

      if(this.resetPasswordRequest.password !== this.confirmPassword.value) {
        this.openSnackBar('The two passwords does not match', 'snackbar-err');
      } else {
        this.resetPasswordService.resetPassword(this.resetPasswordRequest)
          .pipe(takeUntil(this.destroy$)).subscribe({
          next: (data: any) => {
            
          },
          error: (err) => {

          }
        })
      }
    } else {
      this.openSnackBar('Please fill all fields','snackbar-err');
    }
  }

  private openSnackBar(message: string, className: string): void {
    let snackbar: SnackBar = {
      message: message,
      className: className
    }
    this.snackBarService.openSnackBar(snackbar);
  }
}
