import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { Event } from '../github/v3';
import { GithubStore, Digest } from '../github/store';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'app-sync',
  templateUrl: 'sync.component.html',
  styleUrls: ['sync.component.css'],
  pipes: [AsyncPipe],
  directives: [NgFor]
})
export class SyncComponent {
  prs: Observable<Digest[]>;
  events: Observable<Event[]>;

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
