import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendMainContainerComponent } from './friend-main-container.component';

describe('FriendMainContainerComponent', () => {
  let component: FriendMainContainerComponent;
  let fixture: ComponentFixture<FriendMainContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendMainContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
