import { bootstrap } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { PeriscopeAppComponent, environment } from './app';

if (environment.production) {
  enableProdMode();
}

bootstrap(PeriscopeAppComponent);
