import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard  {
  
    constructor(private authService: AuthService,
                private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
        if(this.authService.getAccessToken() !== null) {
          const role = route.data["roles"] as Array<String>;
    
          if(role) {
            const match = this.authService.roleMatch(role);
            if(match) {
              return true;
            } else {
              this.router.navigate(['forbidden']);
              return false;
            }
          } 
        }
  
        this.router.navigate(['login']);
        return false;
      }  
  }