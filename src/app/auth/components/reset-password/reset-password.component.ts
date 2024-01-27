import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../../../shared/models/Email';
import { ResetPasswordService } from '../../services/reset-password.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent { 

  email!: Email;

  destroy$: Subject<boolean> = new Subject<boolean>();

  resetPasswordForm: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  ]);

  constructor(private resetPasswordService: ResetPasswordService) {}

  protected sendCode(): void {
    if(this.resetPasswordForm.valid) {

      this.email = this.resetPasswordForm.value;

      console.log(this.email);

      /*this.resetPasswordService.sendResetPasswordCode(this.email).pipe(takeUntil(this.destroy$)).subscribe({
        next(data) {
          console.log(data);
        },
        error(err) {
          console.log(err);
        },
      });*/
    }
  }
}