import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ReplaySubject, Subject } from 'rxjs';
import { PostAPI } from '@framework-lib/ngx-api';
import { IPost } from '@framework-lib/ngx-domain';

@Injectable({
  providedIn: 'root'
})
export class PostStore {

  private notify = new Subject<any>();
  readonly notify$ = this.notify.asObservable();

  private pessoa = new ReplaySubject<IPost>(1);
  readonly pessoa$ = this.pessoa.asObservable();

  /**
   * CONSTRUCTOR
   * @param pessoaAPI: PostAPI
   */
  constructor(
    private pessoaAPI: PostAPI
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
      (pessoa: IPost) => this.pessoa.next(pessoa),
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
