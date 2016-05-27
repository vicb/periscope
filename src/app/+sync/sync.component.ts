import { Component, OnInit } from '@angular/core';
import { PullRequest, Issue, BaseIssue, Event } from '../github/v3';
import { GithubStore, Digest } from '../github/store';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Component({
  moduleId: module.id,
  selector: 'app-sync',
  templateUrl: 'sync.component.html',
  styleUrls: ['sync.component.css']
})
export class SyncComponent {
  prs: FirebaseListObservable<Digest[]>;
  events: FirebaseListObservable<Event[]>;

  constructor(private store: GithubStore) {
    this.events = store.getWebhookEvents();
    this.prs = store.getOpenPrDigests();
  }
  
  syncPr(number: string) {
    this.store.updatePr(Number.parseInt(number));
  }

  syncAllPRs() {
    this.store.updatePrs();
  }
  
}
