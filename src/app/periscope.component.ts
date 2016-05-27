import { Component } from '@angular/core';
import { TriagePrComponent } from './+triage-pr';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { SyncComponent } from './+sync';
import { HTTP_PROVIDERS } from '@angular/http'
import { PrBoardService } from './pr-board.service';
import { 
  AngularFire,
  FIREBASE_PROVIDERS, 
  defaultFirebase, 
  firebaseAuthConfig,
  AuthProviders,
  AuthMethods,
  FirebaseAuthState
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
      method: AuthMethods.Popup
    }),
    ROUTER_PROVIDERS,
    GithubStore,
    PrBoardService
  ]
})
@Routes([
  {path: '/triage_pr', component: TriagePrComponent},
  {path: '/sync', component: SyncComponent}
])
export class PeriscopeAppComponent {
  title = 'periscope works!';
  authState: FirebaseAuthState;
  
  constructor(private af: AngularFire) {
    this.authState = af.auth.getAuth();  
  }
  
  auth() {
    this.af.auth.login().then((authState) => this.authState = authState);
  }
  
  logout() {
    this.af.auth.logout();
    this.authState = null;
  }
}
