import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

@Injectable({
    providedIn: 'root'
  })
  export class TokenService {
  
    constructor() {}
  
    decodeToken(token: any): any {
      return jwtDecode(token);
    }
  
    getUsername(token: any): any {
      return this.decodeToken(token).sub;
    }
  
    getExpirationTime(token: any): any {
      return this.decodeToken(token).exp;
    }
  
    getRoles(token: any): any {
      return this.decodeToken(token).roles;
    }
  }