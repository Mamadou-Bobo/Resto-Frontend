import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { SnackBar } from '../../../shared/models/SnackBar';
import { ResetPasswordRequest } from '../../model/ResetPasswordRequest';
import { ResetPasswordService } from '../../services/reset-password.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarConfig } from '../../../shared/models/SnackBarConfig';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
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

  password: string = 'password';
  confPassword: string = 'password';
  showPassword: boolean = false;
  showConfPassword: boolean = false;

  closeLabel: string = '';
  

  constructor(private formBuilder: FormBuilder,
              private snackBarService: SnackBarService,
              private resetPasswordService: ResetPasswordService,
              private translate: TranslateService) {
              }

  ngAfterContentInit(): void {
    this.openSnackBar(
      'An email has been sent to you with the code please check your account',
     'snackbar-success',
     this.closeLabel);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  protected resetPassword(): void {
    if(this.updatePasswordForm.valid) {
      this.resetPasswordRequest = this.updatePasswordForm.value

      if(this.resetPasswordRequest.password !== this.confirmPassword.value) {
        
      this.closeLabel = this.translate.instant('closeSnackBarLabel');
        this.openSnackBar(this.translate.instant('passwordsDoNotMatchErrorMessage'),
         'snackbar-err', this.closeLabel);
      } else {
        this.resetPasswordService.resetPassword(this.resetPasswordRequest)
          .pipe(takeUntil(this.destroy$)).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            this.openSnackBar(err.error,'snackbar-err', 'Close');
          }
        })
      }
    } else {
      this.closeLabel = this.translate.instant('closeSnackBarLabel');
      this.openSnackBar(this.translate.instant('requiredFieldsErrorMessage'),
      'snackbar-err', this.closeLabel);
    }
  }

  private openSnackBar(message: string, className: string, closeLabel: string): void {
    let snackbar: SnackBar = {
      message: message,
      className: className,
      closeLabel: closeLabel
    }
    this.snackBarService.openSnackBar(snackbar);
  }

  protected onPasswordClick(): void {
    if (this.password === 'password') {
      this.password = 'text';
      this.showPassword = true;
    } else {
      this.password = 'password';
      this.showPassword = false;
    }
  }

  protected onConfPasswordClick(): void {
    if (this.confPassword === 'password') {
      this.confPassword = 'text';
      this.showConfPassword = true;
    } else {
      this.confPassword = 'password';
      this.showConfPassword = false;
    }
  }
}
