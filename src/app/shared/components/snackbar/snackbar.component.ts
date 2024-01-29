import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '../../services/snackbar.service';
import { SnackBar } from '../../models/SnackBar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private readonly duration: number = 5; // 5 seconds

  constructor(private _snackBar: MatSnackBar,
              private snackBarService: SnackBarService) {}
  
  ngOnInit(): void {
    this.snackBarService.snackbarSubject.subscribe({
      next: (data: SnackBar) => {
        this.openSnackBar(data.message,data.className);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  private openSnackBar(message: string, className: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: [className]
    });
  }
}
