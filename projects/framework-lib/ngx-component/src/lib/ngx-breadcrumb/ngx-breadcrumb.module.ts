import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxBreadcrumbComponent } from './ngx-breadcrumb.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [NgxBreadcrumbComponent],
  exports: [NgxBreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule
  ]
})
export class NgxBreadcrumbModule { }
