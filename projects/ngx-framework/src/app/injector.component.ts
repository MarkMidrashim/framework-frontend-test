import { Component, Injector, NgModuleRef } from '@angular/core';
import { AppModule } from './app.module';

@Component({
  selector: 'app-injector',
  template: '',
  styles: []
})
export class InjectorComponent {}

export function createInjector_component(ngModule: NgModuleRef<AppModule>): Injector {
  const cf = ngModule.componentFactoryResolver.resolveComponentFactory(InjectorComponent);
  return cf.create(Injector.NULL, undefined, undefined, ngModule).injector;
}
