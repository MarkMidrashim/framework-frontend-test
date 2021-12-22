import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'update/:id',
    component: UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
