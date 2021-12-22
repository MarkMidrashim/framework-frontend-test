import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { PostAPI } from '@framework-lib/ngx-api';
import { IPost, GenericParams } from '@framework-lib/ngx-domain';

@Injectable({
  providedIn: 'root'
})
export class PostStore {

  private notify = new Subject<any>();
  readonly notify$ = this.notify.asObservable();

  private posts = new ReplaySubject<IPost[]>(1);
  readonly posts$ = this.posts.asObservable();

  /**
   * CONSTRUCTOR
   * @param postAPI: PostAPI
   */
  constructor(private postAPI: PostAPI) {}

  /**
   * Recupera código do usuário
   * @readonly
   * @memberof PostStore
   */
  get userId() { return 1; }

  /**
   * Método responsável por chamar o serviço de post e informar o parâmetro de busca
   */
  fetch(params: GenericParams): void {
    this.postAPI.getAll(this.buildParams(params)).subscribe(
      (post: IPost[]) => this.posts.next(post),
      (error: Error) => this.notify.next(error)
    );
  }

  /**
   *
   * @param post: IPost
   * @returns
   */
  create(post: IPost): Observable<IPost> {
    return this.postAPI.create(post);
  }

  /**
   *
   * @param post: IPost
   * @returns
   */
  update(post: IPost): Observable<IPost> {
    return this.postAPI.update(post);
  }

  /**
   * Método responsável por chamar o serviço de post e informar o parâmetro para remover
   * @param post: ITodo
   */
  delete(post: IPost): void {
    this.postAPI.delete(post).subscribe();
  }

  /**
   * Reset query store
   */
  reset(): void {
    this.posts.next(undefined);
    this.posts.complete();
  }

  /**
   *
   */
  refresh(): void {
    this.updateList();
  }

  /**
   *
   * @param posts: IPost[]
   */
  private updateList(posts?: IPost[]): void {
    this.posts.next(posts);
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
