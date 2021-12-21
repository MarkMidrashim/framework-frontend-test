import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { TodoAPI } from '@framework-lib/ngx-api';
import { ITodo } from '@framework-lib/ngx-domain';

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
  fetch(): void {
    const params = new HttpParams().set('userId', this.userId.toString());

    this.todoAPI.getAll(params).subscribe(
      (todo: ITodo[]) => this.todos.next(todo),
      (error: Error) => this.notify.next(error)
    );
  }

  /**
   * Método responsável por chamar o serviço de todo e informar o parâmetro de busca
   * @param id: number
   */
  only(id: number): void {
    const params = new HttpParams()
      .set('id', id.toString());

    this.todoAPI.get(params).subscribe(
      (todo: ITodo) => this.todos.next([todo]),
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
   * @param id: number
   */
  delete(id: number): void {
    const params = new HttpParams()
      .set('id', id.toString());

    this.todoAPI.delete(params).subscribe();
  }

  /**
   * Reset query store
   */
  reset(): void {
    this.todos.next(undefined);
    this.todos.complete();
  }
}
