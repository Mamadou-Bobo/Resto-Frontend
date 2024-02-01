import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '../../services/snackbar.service';
import { SnackBar } from '../../models/SnackBar';
import { SnackBarConfig } from '../../models/SnackBarConfig';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent implements OnInit, OnChanges {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private readonly duration: number = 5; // in seconds

  @Input() config: SnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  constructor(private _snackBar: MatSnackBar,
              private snackBarService: SnackBarService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  
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
      horizontalPosition: this.config.horizontalPosition,
      verticalPosition: this.config.verticalPosition,
      duration: this.duration * 1000,
      panelClass: [className]
    });
  }
}
