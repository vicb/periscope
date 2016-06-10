import {enableProdMode, SystemJsComponentResolver, ComponentResolver} from '@angular/core';
import {bootstrap} from '@angular/platform-browser';
import {PeriscopeAppComponent, environment} from './app';
import {RuntimeCompiler} from '@angular/compiler';
import {provideRouter} from '@angular/router';

const routes = [
  {
    path: '/triage_pr',
    component: './app/+triage-pr',
  },
  {path: '/sync', component: './app/+sync'}
];


if (environment.production) {
  enableProdMode();
}

bootstrap(PeriscopeAppComponent, [
  provideRouter(routes),
  {
    provide: ComponentResolver,
    useFactory: (r) => new SystemJsComponentResolver(r),
    deps: [RuntimeCompiler]
  },
]);
