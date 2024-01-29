import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../auth/services/login.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  private token!: string | null;

  constructor(
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.includes(this.loginService.API_URL + '/auth/authenticate') ||
      req.url.includes(this.loginService.API_URL + '/password/verify-account') ||
      req.url.includes(this.loginService.API_URL + '/password/reset-password')
    ) {
      return next.handle(req.clone());
    }

    this.token = this.authService.getAccessToken();

    req = this.addAuthenticationToken(req);

    console.log(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Check if the access token has expired, if true we use the refresh token to grant access
        if (error && error.status === 403) {
          if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
              filter((result) => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(req)))
            );
          } else {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);

            // Call the refresh token and then send the new request
            return this.authService.getRefreshToken().pipe(
              switchMap((success: any) => {
                this.token = success;
                this.refreshTokenSubject.next(success);

                return next.handle(this.addAuthenticationToken(req));
              }),
              finalize(() => (this.refreshTokenInProgress = false))
            );
          }
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private addAuthenticationToken(request: HttpRequest<any>) {
    if (!this.token) {
      return request;
    }

    if (!request.url.match(environment.API_URL)) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
