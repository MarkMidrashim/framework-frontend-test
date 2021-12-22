import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const maskConfig: Partial<IConfig> = {
  validation: true
};

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class CreateModule { }
