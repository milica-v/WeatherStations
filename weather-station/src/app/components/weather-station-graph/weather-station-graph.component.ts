import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-weather-station-graph',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './weather-station-graph.component.html',
  styleUrl: './weather-station-graph.component.css',
})
export class WeatherStationGraphComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  data = [1, 2, 3, 4];

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'line',
        data: this.data,
      },
    ],
  };

  ngOnInit(): void {

  }
}
