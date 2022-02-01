import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteComponentComponent } from './invite-component.component';

describe('InviteComponentComponent', () => {
  let component: InviteComponentComponent;
  let fixture: ComponentFixture<InviteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
