STEP 2 – Trip Data Service (meets “Develop the Trip data service”)

Create app_public/src/app/trip-data.service.ts:

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  // base URL of Express API
  private apiBase = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  // GET all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiBase);
  }

  // GET one trip
  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBase}/${code}`);
  }

  // POST create
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiBase, trip);
  }

  // PUT update
  updateTrip(code: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBase}/${code}`, trip);
  }

  // DELETE
  deleteTrip(code: string): Observable<any> {
    return this.http.delete(`${this.apiBase}/${code}`);
  }
}