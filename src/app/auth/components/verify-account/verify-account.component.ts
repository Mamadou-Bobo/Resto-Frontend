import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Email } from '../../../shared/models/Email';
import { ResetPasswordService } from '../../services/reset-password.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { SnackBar } from '../../../shared/models/SnackBar';
import { Router } from '@angular/router';

@Component({
  selector: 'verify-account',
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.scss'
})
export class VerifyAccountComponent implements OnDestroy {

  isLoading: boolean = false;

  email: Email = {
    recipient: ''
  };

  destroy$: Subject<boolean> = new Subject<boolean>();

  resetPasswordForm: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  ]);

  constructor(private resetPasswordService: ResetPasswordService,
              private snackBarService: SnackBarService,
              private router: Router) {}

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  protected sendCode(): void {
    if(this.resetPasswordForm.valid) {

      this.isLoading = true;

      this.email.recipient = this.resetPasswordForm.value;

      setTimeout(() => {
        this.resetPasswordService.sendResetPasswordCode(this.email).pipe(takeUntil(this.destroy$)).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.isLoading = false;
          },
        });
        this.router.navigate(['reset-password']);
      }, 10000);


    } else if(this.resetPasswordForm.hasError('pattern')) {
      this.openSnackBar('Please enter a valid email','snackbar-err');
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