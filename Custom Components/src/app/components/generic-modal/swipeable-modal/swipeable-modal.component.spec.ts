import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeableModalComponent } from './swipeable-modal.component';

describe('SwipeableModalComponent', () => {
  let component: SwipeableModalComponent;
  let fixture: ComponentFixture<SwipeableModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwipeableModalComponent]
    });
    fixture = TestBed.createComponent(SwipeableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
