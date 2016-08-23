import {NgModule, ApplicationRef} from '@angular/core';
import {PeriscopeAppComponent} from './periscope.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {FIREBASE_PROVIDERS, AuthProviders, AuthMethods,
  FirebaseAuthConfig, FirebaseConfig } from 'angularfire2';
import {TriagePrComponent} from './+triage-pr/triage-pr.component';
import {SyncComponent} from './+sync/sync.component';
import {PrComponent} from './pr/pr.component';

import {MdSidenavModule} from '@angular2-material/sidenav';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdButtonModule} from '@angular2-material/button';
import {MdCheckboxModule} from '@angular2-material/checkbox';
import {MdRadioModule} from '@angular2-material/radio';
import {MdProgressCircleModule} from '@angular2-material/progress-circle';
import {MdProgressBarModule} from '@angular2-material/progress-bar';
import {MdCardModule} from '@angular2-material/card';
import {MdInputModule} from '@angular2-material/input';
import {MdListModule} from '@angular2-material/list';
import {MdIconModule} from '@angular2-material/icon';
import {MdTabsModule} from '@angular2-material/tabs';


export const routes: Routes = [
  { path: 'triage_pr', component: TriagePrComponent },
  { path: 'sync', component: SyncComponent },
  { path: '', redirectTo: 'triage_pr', pathMatch: 'full' }
];

@NgModule({
  declarations: [PeriscopeAppComponent, SyncComponent, TriagePrComponent, PrComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), HttpModule,
    MdSidenavModule, MdToolbarModule, MdButtonModule, MdCheckboxModule, MdRadioModule,
    MdProgressCircleModule, MdProgressBarModule, MdCardModule, MdInputModule,
    MdListModule, MdIconModule, MdTabsModule
  ],
  providers: [
    FIREBASE_PROVIDERS,
    { provide: FirebaseConfig, useValue: {
      apiKey: "AIzaSyDtDqmYnJVGCBSyiIABFHpo5Hvmu3kjvpU",
      authDomain: "project-934503789961360947.firebaseapp.com",
      databaseURL: "https://project-934503789961360947.firebaseio.com",
      storageBucket: "project-934503789961360947.appspot.com"
    }},
    { provide: FirebaseAuthConfig, useValue: {
      provider: AuthProviders.Github,
      method: AuthMethods.Redirect
    }}
  ],
  bootstrap: [PeriscopeAppComponent]
})
export class PeriscopeModule {}
