import { Component } from '@angular/core';
import { TripListComponent } from './trip-list/trip-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TripListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}

