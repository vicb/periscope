import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AngularFire, AuthMethods, AuthProviders, FIREBASE_PROVIDERS, FirebaseAuthConfig, FirebaseAuthState, FirebaseUrl} from 'angularfire2';

import {GithubStore} from './github/store';
import {PrBoardService} from './pr-board.service';

import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox';
import {MD_RADIO_DIRECTIVES, MdRadioDispatcher} from '@angular2-material/radio';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_ICON_DIRECTIVES, MdIconRegistry} from '@angular2-material/icon';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';

@Component({
  moduleId: module.id,
  selector: 'periscope-app',
  templateUrl: 'periscope.component.html',
  styleUrls: ['periscope.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_CHECKBOX_DIRECTIVES,
    MD_RADIO_DIRECTIVES,
    MD_PROGRESS_CIRCLE_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_PROGRESS_BAR_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_TABS_DIRECTIVES,
  ],
  providers: [
    HTTP_PROVIDERS, FIREBASE_PROVIDERS,
    {provide: FirebaseUrl, useValue: 'https://ngperiscope.firebaseio.com'}, {
      provide: FirebaseAuthConfig,
      useValue: {provider: AuthProviders.Github, method: AuthMethods.Popup}
    },
    GithubStore, PrBoardService, MdIconRegistry
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
