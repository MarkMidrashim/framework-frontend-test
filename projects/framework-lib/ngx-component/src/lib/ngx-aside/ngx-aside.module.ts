import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxAsideComponent } from './ngx-aside.component';


@NgModule({
  declarations: [NgxAsideComponent],
  exports: [NgxAsideComponent],
  imports: [CommonModule, RouterModule]
})
export class NgxAsideModule { }
