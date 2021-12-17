import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNavbarComponent } from './ngx-navbar.component';

describe('NgxNavbarComponent', () => {
  let component: NgxNavbarComponent;
  let fixture: ComponentFixture<NgxNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
