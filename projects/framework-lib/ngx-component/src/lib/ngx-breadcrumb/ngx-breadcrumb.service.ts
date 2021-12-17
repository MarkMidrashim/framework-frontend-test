import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { IBreadcrumb } from './ngx-breadcrumb.component';

@Injectable({
  providedIn: 'root'
})
export class NgxBreadcrumbService {

  private subject = new ReplaySubject<IBreadcrumb[]>();
  readonly breadcrumb$: Observable<IBreadcrumb[]> = this.subject.asObservable();
  private breadcrumbs: Map<number, IBreadcrumb> = new Map<number, IBreadcrumb>();

  constructor() { }

  /**
   * Método responsável por adicionar um item no breadcrumb
   * @param id: string
   * @param label: string
   * @param url: string
   * @param position: number
   */
  add(id: string, label: string, url: string, position: number): void {
    const breadcrumb = {id: id, label: label, url: url, position: position} as IBreadcrumb;
    this.breadcrumbs.set(breadcrumb.position, breadcrumb);
    this.subject.next(Array.from(this.breadcrumbs.values()));
  }

  /**
   * Método responsável por verificar se um item já existe
   * @param id: string
   * @returns Verdadeiro se o item estiver mapeado
   */
  wasAdded(id: string): boolean {
    return !!Array.from(this.breadcrumbs.values()).find(
      (breadcrumb: IBreadcrumb) => breadcrumb.id === id
    );
  }

}
