import {AsyncPipe, NgFor} from '@angular/common';
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {GithubStore, Digest} from '../github/store';
import {Event} from '../github/v3';

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

  syncPr(count: string) { this.store.updatePr(Number.parseInt(count, 10)); }

  syncAllPRs() { this.store.updatePrs(); }
}
