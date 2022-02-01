import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectChatContainerComponent } from './direct-chat-container.component';

describe('DirectChatContainerComponent', () => {
  let component: DirectChatContainerComponent;
  let fixture: ComponentFixture<DirectChatContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectChatContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectChatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
