import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserDropdownComponent } from './current-user-dropdown.component';

describe('CurrentUserDropdownComponent', () => {
  let component: CurrentUserDropdownComponent;
  let fixture: ComponentFixture<CurrentUserDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentUserDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
