import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ngx404PageComponent } from './ngx-404-page.component';

describe('Ngx404PageComponent', () => {
  let component: Ngx404PageComponent;
  let fixture: ComponentFixture<Ngx404PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ngx404PageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ngx404PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
