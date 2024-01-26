import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { JWTResponseDTO } from "../../core/models/JWTResponseDTO";
import { AuthRequest } from "../../core/models/authRequest";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public readonly API_URL: string = environment.API_URL;

    constructor(private httpClient: HttpClient) {}

    public login(authRequest: AuthRequest): Observable<JWTResponseDTO> {
        return this.httpClient.post<JWTResponseDTO>(this.API_URL + "/auth/authenticate", authRequest);
    }
}