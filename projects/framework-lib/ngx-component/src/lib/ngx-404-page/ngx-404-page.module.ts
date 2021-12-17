import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ngx404PageComponent } from './ngx-404-page.component';

@NgModule({
  declarations: [Ngx404PageComponent],
  exports: [Ngx404PageComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class Ngx404PageModule { }
