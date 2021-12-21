import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { AlbumAPI } from '@framework-lib/ngx-api';
import { IAlbum } from '@framework-lib/ngx-domain';

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
  fetch(): void {
    const params = new HttpParams().set('userId', this.userId.toString());

    this.albumAPI.getAll(params).subscribe(
      (album: IAlbum[]) => this.albums.next(album),
      (error: Error) => this.notify.next(error)
    );
  }

  /**
   * Método responsável por chamar o serviço de album e informar o parâmetro de busca
   * @param id: number
   */
  only(id: number): void {
    const params = new HttpParams()
      .set('id', id.toString());

    this.albumAPI.get(params).subscribe(
      (album: IAlbum) => this.albums.next([album]),
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
    const params = new HttpParams()
      .set('id', id.toString());

    this.albumAPI.delete(params).subscribe();
  }

  /**
   * Reset query store
   */
  reset(): void {
    this.albums.next(undefined);
    this.albums.complete();
  }
}
