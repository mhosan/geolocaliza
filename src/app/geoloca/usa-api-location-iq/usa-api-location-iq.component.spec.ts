import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaApiLocationIqComponent } from './usa-api-location-iq.component';

describe('UsaApiLocationIqComponent', () => {
  let component: UsaApiLocationIqComponent;
  let fixture: ComponentFixture<UsaApiLocationIqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsaApiLocationIqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaApiLocationIqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
