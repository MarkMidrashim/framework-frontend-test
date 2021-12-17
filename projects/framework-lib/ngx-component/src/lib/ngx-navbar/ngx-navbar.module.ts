import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxNavbarComponent } from './ngx-navbar.component';
import { NgxBreadcrumbModule } from '../ngx-breadcrumb/ngx-breadcrumb.module';

@NgModule({
  declarations: [NgxNavbarComponent],
  exports: [NgxNavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxBreadcrumbModule
  ]
})
export class NgxNavbarModule { }
