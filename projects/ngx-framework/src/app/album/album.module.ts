import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CreateModule } from './create/create.module';
import { UpdateModule } from './update/update.module';

@NgModule({
  declarations: [AlbumComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    CreateModule,
    UpdateModule
  ]
})
export class AlbumModule { }
