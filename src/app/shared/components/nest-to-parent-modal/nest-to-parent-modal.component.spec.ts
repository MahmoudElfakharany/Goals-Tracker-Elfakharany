import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestToParentModalComponent } from './nest-to-parent-modal.component';

describe('NestToParentModalComponent', () => {
  let component: NestToParentModalComponent;
  let fixture: ComponentFixture<NestToParentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestToParentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestToParentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
