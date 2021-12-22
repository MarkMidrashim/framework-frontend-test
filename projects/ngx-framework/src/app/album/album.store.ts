import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { AlbumAPI } from '@framework-lib/ngx-api';
import { GenericParams, IAlbum } from '@framework-lib/ngx-domain';

@Injectable({
  providedIn: 'root'
})
export class AlbumStore {

  private notify = new Subject<any>();
  readonly notify$ = this.notify.asObservable();

  private albums = new ReplaySubject<IAlbum[]>(1);
  readonly albums$ = this.albums.asObservable();

  /**
   * CONSTRUCTOR
   * @param albumAPI: AlbumAPI
   */
  constructor(private albumAPI: AlbumAPI) {}

  /**
   * Recupera código do usuário
   * @readonly
   * @memberof AlbumStore
   */
  get userId() { return 1; }

  /**
   * Método responsável por chamar o serviço de album e informar o parâmetro de busca
   */
  fetch(params: GenericParams): void {
    this.albumAPI.getAll(this.buildParams(params)).subscribe(
      (album: IAlbum[]) => this.albums.next(album),
      (error: Error) => this.notify.next(error)
    );
  }

  /**
   *
   * @param album: IAlbum
   * @returns
   */
  create(album: IAlbum): Observable<IAlbum> {
    return this.albumAPI.create(album);
  }

  /**
   *
   * @param album: IAlbum
   * @returns
   */
  update(album: IAlbum): Observable<IAlbum> {
    return this.albumAPI.update(album);
  }

  /**
   * Método responsável por chamar o serviço de album e informar o parâmetro para remover
   * @param id: number
   */
  delete(id: number): void {
    this.albumAPI.delete(this.buildParams({'id': id.toString()})).subscribe();
  }

  /**
   * Reset query store
   */
  reset(): void {
    this.albums.next(undefined);
    this.albums.complete();
  }

  /**
   *
   * @param params: GenericParams
   * @returns
   */
  private buildParams(params: GenericParams): HttpParams {
    let httpParams = new HttpParams();
    for (let key in params) {
      httpParams = httpParams.set(key, params[key]);
    }

    return httpParams;
  }
}
