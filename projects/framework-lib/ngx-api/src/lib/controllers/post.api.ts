import { Injectable, Injector } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractAPI, IPost } from '@framework-lib/ngx-domain';

@Injectable({
  providedIn: 'root'
})
export class PostAPI extends AbstractAPI<IPost> {

  protected url = 'https://jsonplaceholder.typicode.com/posts';

  /**
   * CONSTRUCTOR
   * @param injector: Injector
   */
  constructor(injector: Injector) {
    super(injector);
  }

  get(params?: HttpParams): Observable<IPost> {
    return super.getGeneric<IPost>(params);
  }

  getAll(params?: HttpParams): Observable<IPost[]> {
    return super.getListGeneric<IPost>(params);
  }

  create(entity: IPost, params?: HttpParams): Observable<IPost> {
    return super.postGeneric(entity, params);
  }

  update(entity: IPost, params?: HttpParams): Observable<IPost> {
    return super.putGeneric(entity, params);
  }

  delete(params?: HttpParams): Observable<void> {
    return super.deleteGeneric(params);
  }

}
