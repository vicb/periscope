import {ComponentResolver, ReflectiveInjector, SystemJsCmpFactoryResolver, coreBootstrap} from '@angular/core';
import {BROWSER_APP_PROVIDERS, browserPlatform} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';

import {PeriscopeAppComponentNgFactory} from './app/periscope.component.ngfactory';

const routes = [
  {
    path: '/triage_pr',
    component: './app/+triage-pr/triage-pr.component#TriagePrComponent',
  },
  {path: '/sync', component: './app/+sync/sync.component#SyncComponent'}
];

let providers = [
  BROWSER_APP_PROVIDERS,
  provideRouter(routes),
  {provide: ComponentResolver, useClass: SystemJsCmpFactoryResolver},
];

const appInjector = ReflectiveInjector.resolveAndCreate(providers, browserPlatform().injector);
coreBootstrap(PeriscopeAppComponentNgFactory, appInjector);
