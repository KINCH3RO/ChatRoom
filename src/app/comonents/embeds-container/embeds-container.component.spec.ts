import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedsContainerComponent } from './embeds-container.component';

describe('EmbedsContainerComponent', () => {
  let component: EmbedsContainerComponent;
  let fixture: ComponentFixture<EmbedsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbedsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
