import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { TokenService } from "./token.service";
import { Role } from "../../shared/models/Role";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    constructor(private tokenService: TokenService) {}
  
    public setRoles(roles: Role[]): void {
      localStorage.setItem("roles", JSON.stringify(roles));
    }
  
    public getRoles(): [] {
      return JSON.parse(localStorage.getItem("roles") || '{}');
    }
  
    private setAccessToken(accessToken: string): void {
      localStorage.setItem("access_token", accessToken);
    }
  
    public getAccessToken(): string | null {
      return localStorage.getItem("access_token");
    }
  
    private setRefreshToken(refreshToken: string): void {
      localStorage.setItem("refresh_token", refreshToken);
    }
  
    public getRefreshToken(): Observable<any> {
      return of(localStorage.getItem("refresh_token"));
    }
  
    public clear() {
      localStorage.clear();
    }
  
    public loggedIn() {
      return this.getRoles() && this.getAccessToken();
    }

    public setToken(access_token: string, refreshToken: string): void {
      this.setAccessToken(access_token);
      this.setRefreshToken(refreshToken);
    }
  
    public roleMatch(allowedRoles: Array<any>): boolean {
      let isMatch = false;
  
      const userRoles: [] = this.tokenService.getRoles(this.getAccessToken());
  
      if (userRoles != null && userRoles) {
        for (let i = 0; i < userRoles.length; i++) {
          for (let j = 0; j < allowedRoles.length; j++) {
            if (userRoles[i] === allowedRoles[j].name) {
              isMatch = true;
              return isMatch;
            } 
          }
        }
      }
  
      return isMatch;
    }
    
  }