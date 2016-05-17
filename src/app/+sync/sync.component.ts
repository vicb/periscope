import { Component, OnInit } from '@angular/core';
import { PullRequest, Issue, BaseIssue } from '../github/v3';
import { GithubStore } from '../github/store';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Component({
  moduleId: module.id,
  selector: 'app-sync',
  templateUrl: 'sync.component.html',
  styleUrls: ['sync.component.css']
})
export class SyncComponent implements OnInit {
  prs: FirebaseListObservable<PullRequest[]>;

  constructor(private store: GithubStore) {
    this.prs = store.getPrs();
  }

  ngOnInit() {
  }
  
  sync(prNumber: string) {
    this.store.updatePrs();
  }
}
