import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Trip } from '../trip';
import { TripDataService } from '../trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripFormComponent } from '../trip-form/trip-form.component';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripCardComponent, TripFormComponent],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  trips: Trip[] = [];
  selectedTrip: Trip | null = null;
  errorMessage = '';
  loading = false;

  constructor(private tripService: TripDataService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.loading = true;
    this.errorMessage = '';

    this.tripService.getTrips().subscribe({
      next: trips => {
        this.trips = trips;
        this.loading = false;
      },
      error: err => {
        console.error('Error loading trips', err);
        this.errorMessage = err?.error?.message || 'Could not load trips.';
        this.loading = false;
      }
    });
  }

  // When user clicks "Edit" on a card
  onEditTrip(trip: Trip): void {
    // use a copy so edits don’t immediately change the list
    this.selectedTrip = { ...trip };
    this.errorMessage = '';
  }

  // 🔹 Called by <app-trip-form (save)="onSaveTrip($event)">
  onSaveTrip(trip: Trip): void {
    this.errorMessage = '';

    const isEdit = !!this.selectedTrip;

    // ✅ updateTrip needs (code, trip)
    const request$ = isEdit
      ? this.tripService.updateTrip(trip.code, trip)
      : this.tripService.addTrip(trip);

    request$.subscribe({
      next: () => {
        this.onTripSaved();
      },
      error: err => {
        console.error('Error saving trip', err);

        if (err.status === 409 && err.error?.message) {
          // Duplicate code coming from backend
          this.errorMessage = err.error.message; // "A trip with that code already exists."
        } else if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error saving trip. Please try again.';
        }
      }
    });
  }

  onTripSaved(): void {
    this.selectedTrip = null;
    this.loadTrips();
  }

  onTripDeleted(): void {
    this.loadTrips();
  }

  trackByCode(index: number, trip: Trip): string {
    return trip.code;
  }
}

