import { Injectable, Injector } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractAPI, IAlbum } from '@framework-lib/ngx-domain';

@Injectable({
  providedIn: 'root'
})
export class AlbumAPI extends AbstractAPI<IAlbum> {

  protected url = 'https://jsonplaceholder.typicode.com/albums';

  /**
   * CONSTRUCTOR
   * @param injector: Injector
   */
  constructor(injector: Injector) {
    super(injector);
  }

  get(params?: HttpParams): Observable<IAlbum> {
    return super.getGeneric<IAlbum>(params);
  }

  getAll(params?: HttpParams): Observable<IAlbum[]> {
    return super.getListGeneric<IAlbum>(params);
  }

  create(entity: IAlbum, params?: HttpParams): Observable<IAlbum> {
    return super.postGeneric(entity, params);
  }

  update(entity: IAlbum, params?: HttpParams): Observable<IAlbum> {
    return super.putGeneric(entity, params);
  }

  delete(entity: IAlbum, params?: HttpParams): Observable<void> {
    return super.deleteGeneric(entity, params);
  }

}
