import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ReplaySubject, Subject } from 'rxjs';
import { TodoAPI } from '@framework-lib/ngx-api';
import { ITodo } from '@framework-lib/ngx-domain';

@Injectable({
  providedIn: 'root'
})
export class TodoStore {

  private notify = new Subject<any>();
  readonly notify$ = this.notify.asObservable();

  private pessoa = new ReplaySubject<ITodo>(1);
  readonly pessoa$ = this.pessoa.asObservable();

  /**
   * CONSTRUCTOR
   * @param pessoaAPI: TodoAPI
   */
  constructor(
    private pessoaAPI: TodoAPI
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
      (pessoa: ITodo) => this.pessoa.next(pessoa),
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
