import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendContainerComponent } from './friend-container.component';

describe('FriendContainerComponent', () => {
  let component: FriendContainerComponent;
  let fixture: ComponentFixture<FriendContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
