import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAsideComponent } from './ngx-aside.component';

describe('NgxAsideComponent', () => {
  let component: NgxAsideComponent;
  let fixture: ComponentFixture<NgxAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxAsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(NgxAsideComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a.navbar-brand span').textContent).toContain('Framework');
  });
});
