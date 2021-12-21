import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, Event as RouteEvent, NavigationEnd } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NgxAsideService } from './ngx-aside.service';
import { IAside } from '@framework-lib/ngx-domain';

@Component({
  selector: 'lib-ngx-aside',
  templateUrl: './ngx-aside.component.html',
  styleUrls: ['./ngx-aside.component.scss']
})
export class NgxAsideComponent implements OnInit {

  loading = false;
  asides!: IAside[];
  lastAside!: IAside;

  private destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  /**
   * CONSTRUCTOR
   * @param _service: NgxAsideService
   * @param _router: Router
   * @param _cd: ChangeDetectorRef
   */
  constructor(
    private _service: NgxAsideService,
    private _router: Router,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loading = false;

    this._router.events
      .pipe(takeUntil(this.destroy$), filter((event: RouteEvent) => event instanceof NavigationEnd))
      .subscribe(() => this.prepare());

    this._service.aside$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: IAside[]) => {
        this.asides = res;
        this.prepare();
      });
  }

  isCurrentRoute(route?: string): boolean {
    return this._router.url.replace('/', '') === route;
  }

  private prepare(): void {
    if (this.asides?.length > 0) {
      const filterAside = this.asides.find((a: IAside) => a.url === this._router.url);
      if (filterAside) {
        this.asides = this.asides
          .sort((a: IAside, b: IAside) => a.position - b.position)
          .filter((a: IAside) => a.position <= filterAside.position);

        this.lastAside = this.asides[this.asides.length - 1];
        this._cd.detectChanges();
        this._cd.markForCheck();
      }
    }
    this.loading = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
