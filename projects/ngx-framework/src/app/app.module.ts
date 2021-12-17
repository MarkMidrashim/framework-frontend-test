import { HttpClientModule } from '@angular/common/http';
import { NgModuleRef } from '@angular/core';
import { ApplicationInitStatus, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { createInjector_component, InjectorComponent } from './injector.component';

import { NgxAsideModule, NgxNavbarModule } from '@framework-lib/ngx-component';

@NgModule({
  declarations: [
    AppComponent,
    InjectorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxAsideModule,
    NgxNavbarModule
  ]
})
export class AppModule {
  constructor(module: NgModuleRef<AppModule>, initStatus: ApplicationInitStatus) {
    initStatus.donePromise.then(() => {
      const injector = createInjector_component(module);
      const el = createCustomElement(AppComponent, { injector });
      customElements.define('ngx-framework', el);
    });
  }

  ngDoBootstrap(): void {}
}
