import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentInterfaceComponent } from './content-interface.component';

describe('ContentInterfaceComponent', () => {
  let component: ContentInterfaceComponent;
  let fixture: ComponentFixture<ContentInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
