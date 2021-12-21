import { PostFormModule } from './form/post-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    NgxSkeletonLoaderModule,
    PostFormModule
  ]
})
export class PostModule { }
