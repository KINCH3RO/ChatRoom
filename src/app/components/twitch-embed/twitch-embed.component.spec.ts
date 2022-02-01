import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchEmbedComponent } from './twitch-embed.component';

describe('TwitchEmbedComponent', () => {
  let component: TwitchEmbedComponent;
  let fixture: ComponentFixture<TwitchEmbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitchEmbedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
