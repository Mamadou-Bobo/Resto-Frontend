import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthRequest } from '../../../core/models/authRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../../core/services/auth.service';
import { JWTResponseDTO } from '../../../core/models/JWTResponseDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

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
              private router: Router,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.password = 'password';
  }

  protected login(): void {
    if(this.authRequestForm.valid) {
      this.authRequest = this.authRequestForm.value;

      this.loginService.login(this.authRequest).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data: JWTResponseDTO) => {
          this.router.navigate(['dashboard']);
          this.authService.setToken(data.access_token,data.refresh_token);
        },
        error(err) {
          console.error(err);
        },
      });
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
}