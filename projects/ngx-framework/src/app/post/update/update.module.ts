import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const maskConfig: Partial<IConfig> = {
  validation: true
};

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class UpdateModule { }
