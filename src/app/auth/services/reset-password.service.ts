import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Email } from "../../shared/models/Email";
import { ResetPasswordRequest } from "../model/ResetPasswordRequest";

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {

    private readonly API_URL: string = environment.API_URL + "/password";

    constructor(private httpClient: HttpClient) {}

    public sendResetPasswordCode(email: Email): Observable<Object> {
        return this.httpClient.post<Object>(this.API_URL + "/verify-account", email);
    }

    public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<any> {
        return this.httpClient.post<any>(this.API_URL + "/reset-password", resetPasswordRequest);
    } 
}