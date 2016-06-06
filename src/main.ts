import {enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser';

import {PeriscopeAppComponent, environment} from './app';

if (environment.production) {
  enableProdMode();
}

bootstrap(PeriscopeAppComponent);
