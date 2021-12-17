import { Component, OnInit } from '@angular/core';
import { NgxBreadcrumbService } from '@framework-lib/ngx-component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /**
   * CONSTRUCTOR
   * @param _breadcrumbService: NgxBreadcrumbService
   */
  constructor(
    private _breadcrumbService: NgxBreadcrumbService
  ) { }

  ngOnInit(): void {
    this._breadcrumbService.add(
      'dashboard-breadcrumb',
      'Dashboard',
      '/dashboard',
      1
    );
  }

}
