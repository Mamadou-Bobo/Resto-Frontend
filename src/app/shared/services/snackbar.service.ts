import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { SnackBar } from "../models/SnackBar";

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    snackbarSubject: Subject<SnackBar> = new Subject<SnackBar>();
    
    public openSnackBar(snackBarObject: SnackBar): void {
        this.snackbarSubject.next(snackBarObject);
    }
    
}