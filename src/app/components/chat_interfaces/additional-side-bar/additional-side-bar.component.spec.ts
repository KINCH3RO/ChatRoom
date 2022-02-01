import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalSideBarComponent } from './additional-side-bar.component';

describe('AdditionalSideBarComponent', () => {
  let component: AdditionalSideBarComponent;
  let fixture: ComponentFixture<AdditionalSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
