import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaApiComponent } from './usa-api.component';

describe('UsaApiComponent', () => {
  let component: UsaApiComponent;
  let fixture: ComponentFixture<UsaApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsaApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
