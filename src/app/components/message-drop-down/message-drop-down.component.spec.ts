import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDropDownComponent } from './message-drop-down.component';

describe('MessageDropDownComponent', () => {
  let component: MessageDropDownComponent;
  let fixture: ComponentFixture<MessageDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageDropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
