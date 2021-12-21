import { Injectable, Injector } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractAPI, ITodo } from '@framework-lib/ngx-domain';

@Injectable({
  providedIn: 'root'
})
export class TodoAPI extends AbstractAPI<ITodo> {

  protected url = 'https://jsonplaceholder.typicode.com/todos';

  /**
   * CONSTRUCTOR
   * @param injector: Injector
   */
  constructor(injector: Injector) {
    super(injector);
  }

  get(params?: HttpParams): Observable<ITodo> {
    return super.getGeneric<ITodo>(params);
  }

  getAll(params?: HttpParams): Observable<ITodo[]> {
    return super.getListGeneric<ITodo>(params);
  }

  create(entity: ITodo, params?: HttpParams): Observable<ITodo> {
    return super.postGeneric(entity, params);
  }

  update(entity: ITodo, params?: HttpParams): Observable<ITodo> {
    return super.putGeneric(entity, params);
  }

  delete(params?: HttpParams): Observable<void> {
    return super.deleteGeneric(params);
  }

}
