import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { fromLonLat, transformExtent } from 'ol/proj.js';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4.js';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css',
})

export class WeatherDashboardComponent implements OnInit {
  constructor() {
    proj4.defs(
      'Zagreb',
      '+proj=tmerc +lat_0=0 +lon_0=16.5 +k=0.9999 +x_0=500000 +y_0=0 +datum=WGS84 +units=m +no_defs',
    );
    register(proj4);
  }
  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        projection: 'Zagreb',
        center: fromLonLat([15.9722, 45.815010], 'Zagreb'),
        zoom: 7,
        extent: transformExtent(
          [13.5, 42.37, 19.45, 46.55],
          'EPSG:4326',
          'Zagreb'
        ),
        minZoom: 6,
      }),
    });
  }
}
