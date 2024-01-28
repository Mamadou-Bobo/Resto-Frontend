import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerComponent {
  @Input() message: string = '';
  @Input() isLoading: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  // This method marks the component for change detection.
  triggerChangeDetection() {
    this.cdr.markForCheck();
  }
}
