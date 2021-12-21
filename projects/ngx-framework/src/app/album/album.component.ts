import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { AlbumStore } from './album.store';
import { IAlbum } from '@framework-lib/ngx-domain';
import { NgxBreadcrumbService } from '@framework-lib/ngx-component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlbumComponent implements OnInit {

  public loading = false;
  public album$: Observable<IAlbum[]> = this._store.albums$;

  /**
   * CONSTRUCTOR
   * @param _store: AlbumStore
   * @param _breadcrumbService: NgxBreadcrumbService
   */
  constructor(
    private _store: AlbumStore,
    private _breadcrumbService: NgxBreadcrumbService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._store.fetch();
      this.loading = true;
    }, 1500);

    this._breadcrumbService.add('album-breadcrumb', 'Album', '/album', 1);
  }

  /**
   * Método responsável for acionar o delete do item
   * @param album: IAlbum
   */
  delete(album: IAlbum) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter esta operação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, remova!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._store.delete(album.id);
        this._store.reset();
        Swal.fire(
          'Removido!',
          'O item foi removido com sucesso.',
          'success'
        );
      }
    });
  }

}
