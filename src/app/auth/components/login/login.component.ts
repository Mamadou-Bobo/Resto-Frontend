import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthRequest } from '../../../core/models/authRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../../core/services/auth.service';
import { JWTResponseDTO } from '../../../core/models/JWTResponseDTO';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { SnackBar } from '../../../shared/models/SnackBar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {

  authRequest!: AuthRequest;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  show: boolean = false;

  password: string = '';

  authRequestForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              public router: Router,
              public authService: AuthService,
              private snackBarService: SnackBarService,
              public translate: TranslateService) {
              }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.password = 'password';
  }

  protected login(): void {
    let snackbar: any;

    const closeLabel = this.translate.instant('closeSnackBarLabel');

    if(this.authRequestForm.valid) {
      this.authRequest = this.authRequestForm.value;

      this.loginService.login(this.authRequest).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data: JWTResponseDTO) => {
          console.log(data);
          this.authService.setToken(data.access_token,data.refresh_token);
          this.router.navigate(['dashboard']);
        },
        error: (err: any) => {
          snackbar = this.setSnackBar(err.error.reason,'snackbar-err', closeLabel);
          this.snackBarService.openSnackBar(snackbar);
        },
      });
    } else {
      const translatedMsg = this.translate.instant('requiredFieldsErrorMessage');
      snackbar = this.setSnackBar(translatedMsg,'snackbar-err', closeLabel);
      this.snackBarService.openSnackBar(snackbar);
    }
  }

  protected onClick(): void {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  private setSnackBar(message: string, className: string, closeLabel: string): SnackBar {
    return {
      message: message,
      className: className,
      closeLabel: closeLabel
    }
  }
}