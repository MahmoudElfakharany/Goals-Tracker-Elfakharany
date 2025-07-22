import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCardModalComponent } from './public-card-modal.component';

describe('PublicCardModalComponent', () => {
  let component: PublicCardModalComponent;
  let fixture: ComponentFixture<PublicCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicCardModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
