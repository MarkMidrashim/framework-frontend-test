import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxAsideComponent } from './ngx-aside.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [NgxAsideComponent],
  exports: [NgxAsideComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule
  ]
})
export class NgxAsideModule { }
