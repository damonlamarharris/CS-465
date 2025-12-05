import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from '../trip';
import { TripDataService } from '../trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {

  @Input() trip!: Trip;

  // Parent (TripList) listens to these
  @Output() edit = new EventEmitter<Trip>();
  @Output() deleted = new EventEmitter<void>();

  deleting = false;
  errorMessage = '';

  constructor(private tripService: TripDataService) {}

  onEditClick(): void {
    this.edit.emit(this.trip);
  }

  onDeleteClick(): void {
    if (!confirm(`Delete trip "${this.trip.name}" (${this.trip.code})?`)) {
      return;
    }

    this.deleting = true;
    this.errorMessage = '';

    this.tripService.deleteTrip(this.trip.code).subscribe({
      next: () => {
        this.deleting = false;
        this.deleted.emit();   // tell parent to refresh list
      },
      error: err => {
        console.error('Error deleting trip', err);
        this.deleting = false;
        this.errorMessage = 'Could not delete trip.';
      }
    });
  }
}

