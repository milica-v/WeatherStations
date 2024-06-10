import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherStationGraphComponent } from './weather-station-graph.component';

describe('WeatherStationGraphComponent', () => {
  let component: WeatherStationGraphComponent;
  let fixture: ComponentFixture<WeatherStationGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherStationGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherStationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
