import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ReplaySubject, Subject } from 'rxjs';
import { AlbumAPI } from '@framework-lib/ngx-api';
import { IAlbum } from '@framework-lib/ngx-domain';

@Injectable({
  providedIn: 'root'
})
export class AlbumStore {

  private notify = new Subject<any>();
  readonly notify$ = this.notify.asObservable();

  private pessoa = new ReplaySubject<IAlbum>(1);
  readonly pessoa$ = this.pessoa.asObservable();

  /**
   * CONSTRUCTOR
   * @param pessoaAPI: AlbumAPI
   */
  constructor(
    private pessoaAPI: AlbumAPI
  ) {}

  /**
   * Método responsável por chamar o serviço de pessoa e informar o parâmetro de busca
   * @param searchTerm: string
   */
  search(searchTerm: string): void {
    const params = new HttpParams()
      .set('cpf', searchTerm)
      .set('singular', '1');

    this.pessoaAPI.get(params).subscribe(
      (pessoa: IAlbum) => this.pessoa.next(pessoa),
      (error: Error) => this.notify.next(error)
    );
  }

  /**
   * Reset query store
   */
  reset(): void {
    this.pessoa.next(undefined);
    this.pessoa.complete();
  }
}
