import { Component } from '@angular/core';
import { TriagePrComponent } from './+triage-pr';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { SyncComponent } from './+sync';
import { HTTP_PROVIDERS } from '@angular/http'
import { 
  AngularFire,
  FIREBASE_PROVIDERS, 
  defaultFirebase, 
  firebaseAuthConfig,
  AuthProviders,
  AuthMethods
} from 'angularfire2';
import { GithubStore } from './github/store';

@Component({
  moduleId: module.id,
  selector: 'periscope-app',
  templateUrl: 'periscope.component.html',
  styleUrls: ['periscope.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HTTP_PROVIDERS,
    FIREBASE_PROVIDERS,
    defaultFirebase('https://ngperiscope.firebaseio.com'),
    firebaseAuthConfig({
      provider: AuthProviders.Github,
      method: AuthMethods.Redirect
    }),
    ROUTER_PROVIDERS,
    GithubStore
  ]
})
@Routes([
  {path: '/triage_pr', component: TriagePrComponent},
  {path: '/sync', component: SyncComponent}
])
export class PeriscopeAppComponent {
  title = 'periscope works!';
  
  constructor(private af: AngularFire) { }
  
  auth() {
    this.af.auth.login();
  }
}
