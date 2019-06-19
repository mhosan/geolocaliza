import { TestBed } from '@angular/core/testing';

import { GeolocaApiLocationIqService } from './geoloca-api-location-iq.service';

describe('GeolocaApiLocationIqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocaApiLocationIqService = TestBed.get(GeolocaApiLocationIqService);
    expect(service).toBeTruthy();
  });
});
