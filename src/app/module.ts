import {NgModule, ApplicationRef} from '@angular/core';
import {PeriscopeAppComponent} from './periscope.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {provideRouter, RouterModule, Routes} from '@angular/router';
import {FIREBASE_PROVIDERS, FirebaseUrl, 
  FirebaseAppConfig, AuthProviders, AuthMethods, 
  FirebaseAuthConfig, FirebaseConfig } from 'angularfire2';
import {TriagePrComponent} from './+triage-pr/triage-pr.component';
import {SyncComponent} from './+sync/sync.component';
import {PrComponent} from './pr/pr.component';

export const routes: Routes = [
  { path: 'triage_pr', component: TriagePrComponent },
  { path: 'sync', component: SyncComponent },
  { path: '', redirectTo: 'triage_pr', pathMatch: 'full' }
];

@NgModule({
  declarations: [PeriscopeAppComponent, SyncComponent, TriagePrComponent, PrComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), HttpModule],
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
