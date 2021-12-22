import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxAsideComponent } from './ngx-aside.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [NgxAsideComponent],
  exports: [NgxAsideComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    MatDividerModule,
    MatListModule
  ]
})
export class NgxAsideModule { }
