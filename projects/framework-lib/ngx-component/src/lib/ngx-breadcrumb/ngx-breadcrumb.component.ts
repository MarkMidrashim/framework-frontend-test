import { NgxBreadcrumbService } from './ngx-breadcrumb.service';
import { ReplaySubject } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Event as RouteEvent, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';

export interface IBreadcrumb {
  id: string;
  label: string;
  url: string;
  position: number;
}

@Component({
  selector: 'lib-ngx-breadcrumb',
  templateUrl: './ngx-breadcrumb.component.html',
  styleUrls: ['./ngx-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxBreadcrumbComponent implements OnInit, OnDestroy {

  loading = false;
  breadcrumbs!: IBreadcrumb[];
  lastBreadcrumb!: IBreadcrumb;

  private destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  /**
   * CONSTRUCTOR
   * @param _service: NgxBreadcrumbService
   * @param _router: Router
   * @param _cd: ChangeDetectorRef
   */
  constructor(
    private _service: NgxBreadcrumbService,
    private _router: Router,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loading = false;

    this._router.events
      .pipe(takeUntil(this.destroy$), filter((event: RouteEvent) => event instanceof NavigationEnd))
      .subscribe(() => this.prepare());

    this._service.breadcrumb$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: IBreadcrumb[]) => {
        this.breadcrumbs = res;
        this.prepare();
      });
  }

  private prepare(): void {
    if (this.breadcrumbs?.length > 0) {
      const filterBreadcrumb = this.breadcrumbs.find((a: IBreadcrumb) => a.url === this._router.url);
      if (filterBreadcrumb) {
        this.breadcrumbs = this.breadcrumbs
          .sort((a: IBreadcrumb, b: IBreadcrumb) => a.position - b.position)
          .filter((a: IBreadcrumb) => a.position <= filterBreadcrumb.position);

        this.lastBreadcrumb = this.breadcrumbs[this.breadcrumbs.length - 1];
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
