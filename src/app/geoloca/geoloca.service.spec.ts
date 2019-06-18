import { TestBed } from '@angular/core/testing';
import { GeolocaService } from './geoloca.service';

describe('GeolocaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocaService = TestBed.get(GeolocaService);
    expect(service).toBeTruthy();
  });
});
