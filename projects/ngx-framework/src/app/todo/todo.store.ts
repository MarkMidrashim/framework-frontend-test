import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { TodoAPI } from '@framework-lib/ngx-api';
import { GenericParams, ITodo } from '@framework-lib/ngx-domain';

@Injectable({
  providedIn: 'root'
})
export class TodoStore {

  private notify = new Subject<any>();
  readonly notify$ = this.notify.asObservable();

  private todos = new ReplaySubject<ITodo[]>(1);
  readonly todos$ = this.todos.asObservable();

  /**
   * CONSTRUCTOR
   * @param todoAPI: TodoAPI
   */
  constructor(private todoAPI: TodoAPI) {}

  /**
   * Recupera código do usuário
   * @readonly
   * @memberof TodoStore
   */
  get userId() { return 1; }

  /**
   * Método responsável por chamar o serviço de todo e informar o parâmetro de busca
   */
  fetch(params: GenericParams): void {
    this.todoAPI.getAll(this.buildParams(params)).subscribe(
      (todo: ITodo[]) => this.todos.next(todo),
      (error: Error) => this.notify.next(error)
    );
  }

  /**
   *
   * @param todo: ITodo
   * @returns
   */
  create(todo: ITodo): Observable<ITodo> {
    return this.todoAPI.create(todo);
  }

  /**
   *
   * @param todo: ITodo
   * @returns
   */
  update(todo: ITodo): Observable<ITodo> {
    return this.todoAPI.update(todo);
  }

  /**
   * Método responsável por chamar o serviço de todo e informar o parâmetro para remover
   * @param todo: ITodo
   */
  delete(todo: ITodo): void {
    this.todoAPI.delete(todo).subscribe();
  }

  /**
   * Reset query store
   */
  reset(): void {
    this.todos.next(undefined);
    this.todos.complete();
  }

  /**
   *
   */
  refresh(): void {
    this.updateList();
  }

  /**
   *
   * @param todos: ITodo[]
   */
  private updateList(todos?: ITodo[]): void {
    this.todos.next(todos);
  }

  /**
   *
   * @param params: GenericParams
   * @returns
   */
  private buildParams(params: GenericParams): HttpParams {
    let httpParams = new HttpParams();
    for (let key in params) {
      httpParams = httpParams.append(key, params[key]);
    }

    return httpParams;
  }
}
