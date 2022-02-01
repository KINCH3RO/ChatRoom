import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteEmbedComponent } from './invite-embed.component';

describe('InviteEmbedComponent', () => {
  let component: InviteEmbedComponent;
  let fixture: ComponentFixture<InviteEmbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteEmbedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
