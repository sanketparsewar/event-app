import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyBookingPage } from './my-booking.page';

describe('MyBookingPage', () => {
  let component: MyBookingPage;
  let fixture: ComponentFixture<MyBookingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
