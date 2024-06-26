import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { WeatherStationGraphComponent } from './components/weather-station-graph/weather-station-graph.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MapComponent,
    WeatherStationGraphComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-station';
  chartData: any;
  isDataLoaded = false;

  onDataLoaded(data: any[]) {
    if (data != null) {
      this.chartData = data;
      this.isDataLoaded = true;
    } else {
      this.isDataLoaded = false;
    }
  }
}
