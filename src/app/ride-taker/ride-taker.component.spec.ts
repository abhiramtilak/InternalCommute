import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideTakerComponent } from './ride-taker.component';

describe('RideTakerComponent', () => {
  let component: RideTakerComponent;
  let fixture: ComponentFixture<RideTakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideTakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
