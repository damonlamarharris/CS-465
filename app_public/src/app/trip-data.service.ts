import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  // Base path for all trip API calls
  private apiBase = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  /** GET: fetch all trips */
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiBase);
  }

  /** GET: fetch one trip by trip code */
  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBase}/${code}`);
  }

  /** POST: add a new trip */
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiBase, trip);
  }

  /** PUT: update an existing trip */
  updateTrip(code: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBase}/${code}`, trip);
  }

  /** DELETE: delete a trip */
  deleteTrip(code: string): Observable<any> {
    return this.http.delete(`${this.apiBase}/${code}`);
  }
}

