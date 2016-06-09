import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {AngularFire, FIREBASE_PROVIDERS, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseAuthConfig, FirebaseUrl} from 'angularfire2';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {GithubStore} from './github/store';
import {PrBoardService} from './pr-board.service';

@Component({
  moduleId: module.id,
  selector: 'periscope-app',
  templateUrl: 'periscope.component.html',
  styleUrls: ['periscope.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [,
    HTTP_PROVIDERS,
    FIREBASE_PROVIDERS,
    {provide: FirebaseUrl, useValue: 'https://ngperiscope.firebaseio.com'}, {
      provide: FirebaseAuthConfig,
      useValue: {provider: AuthProviders.Github, method: AuthMethods.Popup}
    },
    GithubStore,
    PrBoardService
  ]
})
export class PeriscopeAppComponent {
  authState: FirebaseAuthState;

  constructor(private af: AngularFire) {}

  auth() { this.af.auth.login().then((authState) => this.authState = authState); }

  logout() {
    this.af.auth.logout();
    this.authState = null;
  }
}
