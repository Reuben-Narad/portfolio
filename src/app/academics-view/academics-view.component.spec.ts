import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicsViewComponent } from './academics-view.component';

describe('AcademicsViewComponent', () => {
  let component: AcademicsViewComponent;
  let fixture: ComponentFixture<AcademicsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
