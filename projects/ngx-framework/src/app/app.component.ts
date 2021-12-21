import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgxAsideService } from '@framework-lib/ngx-component';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'framework';
  routes!: Route[];

  /**
   * CONSTRUCTOR
   * @param _router
   * @param _aside
   */
  constructor(
    private _router: Router,
    private _aside: NgxAsideService
  ) {
    this.routes = routes;
  }

  ngOnInit(): void {
    this.prepare();
    this._router.initialNavigation();
  }

  private prepare(): void {
    let count = 0;
    this.routes
      .filter((route: Route) => route.path !== '' && !route.path?.includes('**'))
      .map((route: Route) => {
        let path = route.path?.replace('/', '');
        this._aside.add(`${path}-${++count}`, this.capitalize(path), route.path, this.iconToRoute(path), count);
      });
  }

  private capitalize(value?: string): string {
    let arr = value?.split(' ') || [];
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
  }

  private iconToRoute(route?: string): string {
    switch(route) {
      case 'dashboard':
        return 'analytics';
      case 'post':
        return 'mail-bulk';
      case 'todo':
        return 'list';
      case 'album':
        return 'images';
      default:
        return '';
    }
  }
}
