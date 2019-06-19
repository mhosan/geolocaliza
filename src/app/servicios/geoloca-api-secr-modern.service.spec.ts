import { TestBed } from '@angular/core/testing';

import { GeolocaApiSecrModernService } from './geoloca-api-secr-modern.service';

describe('GeolocaApiSecrModernService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocaApiSecrModernService = TestBed.get(GeolocaApiSecrModernService);
    expect(service).toBeTruthy();
  });
});
