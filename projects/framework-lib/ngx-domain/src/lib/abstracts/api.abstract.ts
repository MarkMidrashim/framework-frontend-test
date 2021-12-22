import { Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from './entity.abstract';

export abstract class AbstractAPI<T> {

  /**
   * URL a ser chamada
   * @protected
   * @abstract
   * @type {string}
   * @memberof AbstractAPI
   */
  protected abstract url: string;

  /**
   * Service http
   * @protected
   * @type {HttpClient}
   * @memberof AbstractAPI
   */
  protected http: HttpClient;

  /**
   * CONSTRUCTOR
   * @param injector: Injector
   */
  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  /**
   * Método responsável por buscar entidade da api com objeto genérico
   * @param params?: HttpParams
   * @template U objeto abstrato de retorno
   * @returns
   */
  protected getGeneric<U>(params?: HttpParams): Observable<U> {
    return this.http.get<U>(this.url, { params: params });
  }

  /**
   * Método responsável por buscar uma lista de entidades da api com objeto genérico
   * @param params?: HttpParams
   * @template U objeto abstrato de retorno
   * @returns
   */
  protected getListGeneric<U>(params?: HttpParams): Observable<Array<U>> {
    return this.http.get<Array<U>>(this.url, { params: params });
  }

  /**
   * Envia um post para api com objeto genérico
   * @param entity: Entity
   * @param params?: HttpParams
   * @template U objeto abstrato de retorno
   * @returns
   */
  protected postGeneric<U>(entity: Entity, params?: HttpParams): Observable<U> {
    return this.http.post<U>(this.url, entity, { params: params });
  }

  /**
   * Envia um put para api com objeto genérico
   * @param entity: Entity
   * @param params?: HttpParams
   * @template U objeto abstrato de retorno
   * @returns
   */
  protected putGeneric<U>(entity: Entity, params?: HttpParams): Observable<U> {
    return this.http.put<U>(this.url, entity, { params: params });
  }

  /**
   * Envia um patch para api com objeto genérico
   * @param entity: Entity
   * @param params?: HttpParams
   * @template U objeto abstrato de retorno
   * @returns
   */
  protected patchGeneric<U>(entity: Entity, params?: HttpParams): Observable<U> {
    return this.http.patch<U>(this.url, entity, { params: params });
  }

  /**
   * Envia um delete para api
   * @param entity: Entity
   * @param params?: HttpParams
   * @returns
   */
  protected deleteGeneric(entity: Entity, params?: HttpParams): Observable<void> {
    return this.http.delete<void>(`${this.url}/${entity?.id}`, { params: params });
  }

}
