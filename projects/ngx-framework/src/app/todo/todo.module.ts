import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CreateModule } from './create/create.module';
import { UpdateModule } from './update/update.module';

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    CreateModule,
    UpdateModule
  ]
})
export class TodoModule { }
