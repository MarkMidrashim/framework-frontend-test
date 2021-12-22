import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CreateModule } from './create/create.module';
import { UpdateModule } from './update/update.module';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    NgxSkeletonLoaderModule,
    CreateModule,
    UpdateModule
  ]
})
export class PostModule { }
