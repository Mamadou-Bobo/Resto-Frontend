import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../../../shared/models/Email';
import { ResetPasswordService } from '../../services/reset-password.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { SnackBar } from '../../../shared/models/SnackBar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnDestroy { 

  email: Email = {
    recipient: ''
  };

  destroy$: Subject<boolean> = new Subject<boolean>();

  resetPasswordForm: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  ]);

  constructor(private resetPasswordService: ResetPasswordService,
              private snackBarService: SnackBarService) {}

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  protected sendCode(): void {
    if(this.resetPasswordForm.valid) {

      this.email.recipient = this.resetPasswordForm.value;

      console.log(this.email);

      this.resetPasswordService.sendResetPasswordCode(this.email).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if(this.resetPasswordForm.hasError('pattern')) {
      this.setSnackBar('Please enter a valid email','snackbar-err');
    } else {
      this.setSnackBar('Please fill all fields','snackbar-err');
    }
  }

  private setSnackBar(message: string, className: string): void {
    let snackbar: SnackBar = {
      message: message,
      className: className
    }
    this.snackBarService.openSnackBar(snackbar);
  }
}