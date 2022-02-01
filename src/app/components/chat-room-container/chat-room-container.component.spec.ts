import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomContainerComponent } from './chat-room-container.component';

describe('ChatRoomContainerComponent', () => {
  let component: ChatRoomContainerComponent;
  let fixture: ComponentFixture<ChatRoomContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatRoomContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
