import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreindsPageComponent } from './freinds-page.component';

describe('FreindsPageComponent', () => {
  let component: FreindsPageComponent;
  let fixture: ComponentFixture<FreindsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreindsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreindsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
