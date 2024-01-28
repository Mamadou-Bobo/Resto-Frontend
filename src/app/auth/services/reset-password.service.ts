import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Email } from "../../shared/models/Email";

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {

    private readonly API_URL: string = environment.API_URL;

    constructor(private httpClient: HttpClient) {}

    public sendResetPasswordCode(email: Email): Observable<Object> {
        return this.httpClient.post<Object>(this.API_URL + "/password/reset/code", email);
    }
}