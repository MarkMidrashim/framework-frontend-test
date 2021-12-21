import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { IAside } from '@framework-lib/ngx-domain';

@Injectable({
  providedIn: 'root'
})
export class NgxAsideService {

  private subject = new ReplaySubject<IAside[]>();
  readonly aside$: Observable<IAside[]> = this.subject.asObservable();
  private asides: Map<number, IAside> = new Map<number, IAside>();

  constructor() { }

  /**
   * Método responsável por adicionar um item no aside
   * @param id: string
   * @param label: string
   * @param url: string | undefined
   * @param icon: string
   * @param position: number
   */
  add(id: string, label: string, url: string | undefined, icon: string, position: number): void {
    const aside = {id: id, label: label, url: url, icon: icon, position: position} as IAside;
    this.asides.set(aside.position, aside);
    this.subject.next(Array.from(this.asides.values()));
  }

  /**
   * Método responsável por verificar se um item já existe
   * @param id: string
   * @returns Verdadeiro se o item estiver mapeado
   */
  wasAdded(id: string): boolean {
    return !!Array.from(this.asides.values()).find(
      (aside: IAside) => aside.id === id
    );
  }

}
