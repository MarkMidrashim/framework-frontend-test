import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { PostStore } from './post.store';
import { IPost } from '@framework-lib/ngx-domain';
import { NgxBreadcrumbService } from '@framework-lib/ngx-component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {

  public loading = false;
  public post$: Observable<IPost[]> = this._store.posts$;

  /**
   * CONSTRUCTOR
   * @param _store: PostStore
   * @param _breadcrumbService: NgxBreadcrumbService
   */
  constructor(
    private _router: Router,
    private _store: PostStore,
    private _breadcrumbService: NgxBreadcrumbService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._store.fetch();
      this.loading = true;
    }, 1500);

    this._breadcrumbService.add('post-breadcrumb', 'Post', '/post', 1);
  }

  /**
   * Método responsável por direcionar para atualização
   * @param id: number
   */
  update(id: number): void {
    this._router.navigate(['/update/', id]);
  }

  /**
   * Método responsável for acionar o delete do item
   * @param post: IPost
   */
  delete(post: IPost) {
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
        this._store.delete(post.id);
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
