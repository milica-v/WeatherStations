import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import OSM from 'ol/source/OSM.js';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import { Icon, Style } from 'ol/style.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { fromLonLat, transformExtent } from 'ol/proj.js';
import { AppService } from '../../app.service';
import { Station } from '../../interfaces/station';
import { firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  providers: [DatePipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  @Output() dataLoaded: EventEmitter<any[]> = new EventEmitter();
  map: Map;
  iconStyle: Style;
  stations: Station[] = [];
  points: Feature[] = [];

  weatherData: any;
  time: any;
  airPressure: any;
  airTemperature: any;
  amountOfPrecipitation: any;
  airHumidity: any;
  windSpeed: any;
  windDirection: any;

  constructor(private service: AppService, public datepipe: DatePipe) {}

  async ngOnInit() {
    const response = await firstValueFrom(this.service.getStations());
    this.stations = response.stations;
    this.initializeMap();
    this.map.on('pointermove', (evt) => {
      this.map.getTargetElement().style.cursor = this.map.hasFeatureAtPixel(
        evt.pixel
      )
        ? 'pointer'
        : '';
    });

    this.map.on('click', (evt) => {
      this.dataLoaded.emit(null);
      if (this.map.hasFeatureAtPixel(evt.pixel)) {
        const name = this.map
          .getFeaturesAtPixel(evt.pixel)[0]
          .getProperties().name;
        const station = this.stations.find((s) => s.name == name);
        console.log(station);
        if (station != null) {
          // window.open(station.link, '_blank');
          this.service
            .getWeather(
              station.coordinates.latitude,
              station.coordinates.longitude
            )
            .subscribe((response) => {
              this.weatherData = response;
              this.time = response.properties.timeseries.map((dataSet) =>
                this.datepipe.transform(dataSet.time, 'yyyy-MM-dd HH:mm')
              );
              this.airPressure = response.properties.timeseries.map(
                (dataSet) =>
                  dataSet.data.instant.details.air_pressure_at_sea_level
              );
              this.airTemperature = response.properties.timeseries.map(
                (dataSet) => dataSet.data.instant.details.air_temperature
              );
              this.amountOfPrecipitation = response.properties.timeseries.map(
                (dataSet) => dataSet.data.instant.details.precipitation_amount
              );
              this.airHumidity = response.properties.timeseries.map(
                (dataSet) => dataSet.data.instant.details.relative_humidity
              );
              this.windSpeed = response.properties.timeseries.map(
                (dataSet) => dataSet.data.instant.details.wind_speed
              );
              this.windDirection = response.properties.timeseries.map(
                (dataSet) => dataSet.data.instant.details.wind_from_direction
              );
              this.dataLoaded.emit([
                station.name,
                this.time,
                this.airPressure,
                this.airTemperature,
                this.amountOfPrecipitation,
                this.airHumidity,
                this.windSpeed,
                this.windDirection,
              ]);
            });
        }
      }
    });
  }

  initializeMap() {
    for (var station of this.stations) {
      this.points.push(
        new Feature({
          geometry: new Point(
            fromLonLat([
              station.coordinates.longitude,
              station.coordinates.latitude,
            ])
          ),
          name: station.name,
        })
      );
    }

    this.iconStyle = new Style({
      image: new Icon({
        crossOrigin: 'anonymous',
        src: 'assets/icon.png',
        scale: 0.2,
      }),
    });

    for (var point of this.points) {
      point.setStyle(this.iconStyle);
    }

    const vectorSource = new VectorSource({
      features: this.points,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const rasterLayer = new TileLayer({
      source: new OSM(),
    });

    this.map = new Map({
      layers: [rasterLayer, vectorLayer],
      target: document.getElementById('map'),
      view: new View({
        center: fromLonLat([15.9722, 45.81501]),
        zoom: 0,
        extent: transformExtent(
          [12.5, 41.37, 20.45, 47.55],
          'EPSG:4326',
          'EPSG:3857'
        ),
      }),
    });
  }
}
