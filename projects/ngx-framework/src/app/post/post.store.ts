import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { PostAPI } from '@framework-lib/ngx-api';
import { IPost } from '@framework-lib/ngx-domain';

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
  fetch(): void {
    const params = new HttpParams().set('userId', this.userId.toString());

    this.postAPI.getAll(params).subscribe(
      (post: IPost[]) => this.posts.next(post),
      (error: Error) => this.notify.next(error)
    );
  }

  /**
   * Método responsável por chamar o serviço de post e informar o parâmetro de busca
   * @param id: number
   */
  only(id: number): void {
    const params = new HttpParams()
      .set('id', id.toString());

    this.postAPI.get(params).subscribe(
      (post: IPost) => this.posts.next([post]),
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
   * @param id: number
   */
  delete(id: number): void {
    const params = new HttpParams()
      .set('id', id.toString());

    this.postAPI.delete(params).subscribe();
  }

  /**
   * Reset query store
   */
  reset(): void {
    this.posts.next(undefined);
    this.posts.complete();
  }
}
