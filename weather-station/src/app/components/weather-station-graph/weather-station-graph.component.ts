import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  chartOptions: Highcharts.Options | any;
  @Input() chartData: any;

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'spline',
        width: 1800,
        overflow: 'hidden',
      },
      title: {
        text: this.chartData[0],
      },
      xAxis: {
        type: 'datetime',
        categories: this.chartData[1],
        labels: {
          formatter: function () {
            if (this.pos % 4 === 0)
              return formatDate(this.value, "MM/dd/yyyy,'<br/>'hh:mm", 'en-US');
          },
        },
      },
      series: [
        {
          name: 'Air Pressure (hPa)',
          data: this.chartData[3],
        },
        {
          name: 'Air Temperature (°C)',
          data: this.chartData[2],
        },
        {
          name: 'Percipitation Amount (mm)',
          data: this.chartData[3],
        },
        {
          name: 'Air Humidity (%)',
          data: this.chartData[4],
        },
        {
          name: 'Wind Speed (m/s)',
          data: this.chartData[5],
        },
        {
          name: 'Wind Direction (°)',
          data: this.chartData[6],
        },
      ],
      accessibility: {
        enabled: false,
      },
    };
  }
}
