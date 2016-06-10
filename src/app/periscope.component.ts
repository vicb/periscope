import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AngularFire, AuthMethods, AuthProviders, FIREBASE_PROVIDERS, FirebaseAuthConfig, FirebaseConfig} from 'angularfire2';

import {GithubStore} from './github/store';
import {PrBoardService} from './pr-board.service';

import * as firebase from 'firebase';

@Component({
  moduleId: module.id,
  selector: 'periscope-app',
  templateUrl: 'periscope.component.html',
  styleUrls: ['periscope.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HTTP_PROVIDERS, FIREBASE_PROVIDERS,
    {provide: FirebaseConfig, useValue: {
      apiKey: "AIzaSyDtDqmYnJVGCBSyiIABFHpo5Hvmu3kjvpU",
      authDomain: "project-934503789961360947.firebaseapp.com",
      databaseURL: "https://project-934503789961360947.firebaseio.com",
      storageBucket: "project-934503789961360947.appspot.com",
    }}, {
      provide: FirebaseAuthConfig,
      useValue: {provider: AuthProviders.Github, method: AuthMethods.Popup}
    },
    GithubStore, PrBoardService
  ]
})
export class PeriscopeAppComponent {
  authState: firebase.User | void;

  constructor(private af: AngularFire) {}

  auth() { this.af.auth.login().then((authState) => this.authState = authState); }

  logout() {
    this.af.auth.logout();
    this.authState = null;
  }
}
