import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { TodoStore } from './todo.store';
import { ITodo } from '@framework-lib/ngx-domain';
import { NgxBreadcrumbService } from '@framework-lib/ngx-component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoComponent implements OnInit {

  public loading = false;
  public todo$: Observable<ITodo[]> = this._store.todos$;

  /**
   * CONSTRUCTOR
   * @param _store: TodoStore
   * @param _breadcrumbService: NgxBreadcrumbService
   */
  constructor(
    private _store: TodoStore,
    private _breadcrumbService: NgxBreadcrumbService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._store.fetch();
      this.loading = true;
    }, 1500);

    this._breadcrumbService.add('todo-breadcrumb', 'Todo', '/todo', 1);
  }

  /**
   * Método responsável for acionar o delete do item
   * @param todo: ITodo
   */
  delete(todo: ITodo) {
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
        this._store.delete(todo.id);
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
