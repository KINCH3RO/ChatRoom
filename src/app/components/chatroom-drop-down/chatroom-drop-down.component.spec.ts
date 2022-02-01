import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomDropDownComponent } from './chatroom-drop-down.component';

describe('ChatroomDropDownComponent', () => {
  let component: ChatroomDropDownComponent;
  let fixture: ComponentFixture<ChatroomDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomDropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
