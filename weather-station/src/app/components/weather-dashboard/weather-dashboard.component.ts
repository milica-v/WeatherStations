import { Component, OnInit } from '@angular/core';
import OSM from 'ol/source/OSM.js';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import { Icon, Style } from 'ol/style.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { fromLonLat, transformExtent } from 'ol/proj.js';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css',
})
export class WeatherDashboardComponent implements OnInit {
  map: Map;
  point1: Feature;
  point2: Feature;
  point3: Feature;
  point4: Feature;
  iconStyle: Style;

  ngOnInit() {
    this.initializeMap();

    this.map.on('pointermove', (evt) => {
      this.map.getTargetElement().style.cursor = this.map.hasFeatureAtPixel(
        evt.pixel
      )
        ? 'pointer'
        : '';
    });

    this.map.on('click', (evt) => {
      if (this.map.hasFeatureAtPixel(evt.pixel)) {
        const name = this.map
          .getFeaturesAtPixel(evt.pixel)[0]
          .getProperties().name;
        if (name == 'Zagreb Grič') {
          window.open(
            'https://www.yr.no/en/forecast/hourly-table/2-3186886/Croatia/City%20of%20Zagreb/Zagreb?i=0',
            '_blank'
          );
        } else if (name == 'Split Marjan') {
          window.open(
            'https://www.yr.no/en/forecast/hourly-table/2-3190261/Croatia/Split-Dalmatia/Town%20of%20Split/Split?i=0',
            '_blank'
          );
        } else if (name == 'Rijeka Kozala') {
          window.open(
            'https://www.yr.no/en/forecast/hourly-table/2-3191648/Croatia/Primorje-Gorski%20Kotar%20County/Town%20of%20Rijeka/Rijeka?i=0',
            '_blank'
          );
        } else if (name == 'Osijek Čepin') {
          window.open(
            'https://www.yr.no/en/forecast/hourly-table/2-3193935/Croatia/County%20of%20Osijek-Baranja/Osijek/Osijek?i=0',
            '_blank'
          );
        }
      }
    });
  }

  initializeMap() {
    this.point1 = new Feature({
      geometry: new Point(fromLonLat([15.9722, 45.8146])),
      name: 'Zagreb Grič',
    });

    this.point2 = new Feature({
      geometry: new Point(fromLonLat([16.4256, 43.5084])),
      name: 'Split Marjan',
    });

    this.point3 = new Feature({
      geometry: new Point(fromLonLat([14.4428, 45.3371])),
      name: 'Rijeka Kozala',
    });
    this.point4 = new Feature({
      geometry: new Point(fromLonLat([18.5614, 45.5024])),
      name: 'Osijek Čepin',
    });

    this.iconStyle = new Style({
      image: new Icon({
        crossOrigin: 'anonymous',
        src: 'assets/icon.png',
        scale: 0.2,
      }),
    });

    this.point1.setStyle(this.iconStyle);
    this.point2.setStyle(this.iconStyle);
    this.point3.setStyle(this.iconStyle);
    this.point4.setStyle(this.iconStyle);

    const vectorSource = new VectorSource({
      features: [this.point1, this.point2, this.point3, this.point4],
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
