import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateChatroomComponent } from './private-chatroom.component';

describe('PrivateChatroomComponent', () => {
  let component: PrivateChatroomComponent;
  let fixture: ComponentFixture<PrivateChatroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateChatroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
