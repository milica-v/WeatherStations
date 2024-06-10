import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from './interfaces/station';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private stationsUrl = 'assets/app-config.json';
  private apiUrl = 'https://api.met.no/weatherapi/locationforecast/2.0/compact';

    constructor(private http: HttpClient) { }

    getStations(): Observable<{stations: Station[]}> {
        return this.http.get<{stations: Station[]}>(this.stationsUrl);
    }

    getWeather(latitude: number, longitude: number): Observable<any> {
      return this.http.get(`${this.apiUrl}?lat=${latitude}&lon=${longitude}`);
    }
}
