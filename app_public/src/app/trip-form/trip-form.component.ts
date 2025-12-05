import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent implements OnChanges {

  // If trip is present → edit mode, otherwise add mode
  @Input() trip: Trip | null = null;

  // 🔹 Emit the Trip data up to TripListComponent
  @Output() save = new EventEmitter<Trip>();

  // Local model bound to the form
  model: Trip = this.emptyTrip();
  errorMessage = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trip']) {
      // Copy trip into model for editing, or reset for add
      this.model = this.trip ? { ...this.trip } : this.emptyTrip();
      this.errorMessage = '';
    }
  }

  private emptyTrip(): Trip {
    return {
      code: '',
      name: '',
      length: 1,
      start: '',        // can be string date from <input type="date">
      resort: '',
      perPerson: 0
    };
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.model.code || !this.model.name) {
      this.errorMessage = 'Code and Name are required.';
      return;
    }

    // 🔹 Let the parent decide whether to add or update
    this.save.emit(this.model);
  }
}

