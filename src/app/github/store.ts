import { Injectable } from '@angular/core';
import { PullRequest, Issue, BaseIssue, LabelRef, Event } from './v3';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { 
  AngularFire, 
  FirebaseListObservable, 
  FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';

const EVENTS = '/github_webhook_events';

@Injectable()
export class GithubStore {
  constructor(private af: AngularFire, private http: Http) {
    this._consumeEvents();
  }
  
  private _consumeEvents() {
    var events = this.getWebhookEvents(1);
    var subscription = events.subscribe((events: Event[]) => {
      if (events.length) {
        var event = events[0];
        this._consumeEvent(this.af.database.object(EVENTS + '/' + event['$key']));
      }
    })
  }
  
  private _consumeEvent(event: FirebaseObjectObservable<Event>) {
    event.subscribe((e: Event) => {
      if (!e) return;
      console.log(e);
      switch (e && e.action) {
        case "synchronize": 
        case "labeled": 
        case "unlabeled": 
        case "assigned": 
        case "unassigned": 
        case "opened": 
        case "closed": 
        case "reopened": 
        case "edited": 
        case "created": 
        case "deleted": 
          if (e.issue) {
            this._updateObject(ISSUE_EXTRACTOR, e.issue);
            event.remove();
          } else if (e.pull_request) {
            this._updateObject(PR_EXTRACTOR, e.pull_request);
            event.remove();            
          } else {
            console.error('unknown event: ', e);            
          }
          break;
        case "deleted": 
          if (e.comment) {
            // We don't process comments
            event.remove();
          }        
        default: 
          console.error('unknown action: ' + (e.action));
      }
    })
  }
  
  getOpenPrDigests(): FirebaseListObservable<Digest[]> {
    return this.af.database.list(PR_EXTRACTOR.digestUrl + '/open');    
  }

  getWebhookEvents(limitTo: number = 10): FirebaseListObservable<Event[]> {
    return this.af.database.list(EVENTS, {query: {limitToFirst: limitTo}});    
  }
  
  updatePr(prNumber: number): void {
    return this._update(PR_EXTRACTOR, prNumber);
  }
  
  updatePrs() {
    return this._updateAll(PR_EXTRACTOR)
  }
  
  private _updateAll(extractor: Extractor): void {
    var fetchPage = (page: number) => {
      this
        ._get(extractor.githubUrl, {page: page, state: 'all'})
        .subscribe((prsResponse: Response) => {
          var prs: PullRequest[] = prsResponse.json();
          prs.forEach((pr: PullRequest) => {
            this._updateObject(extractor, pr);
          });
          if (prs.length) fetchPage(page + 1);
        });
    }
    fetchPage(0);
  }
  
  private _update(extractor: Extractor, number: number): void {
    this
      ._get(extractor.githubUrl + '/' + number)
      .subscribe(
        (prResponse: Response) => this._updateObject(extractor, prResponse.json()),
        (error: Response) => console.error(error) 
      );
      //TODO: how do I return FirebaseObjectObservable<PullRequest>?
  }

  private _updateObject(extractor: Extractor, prOrIssue: PullRequest | Issue): void {
    this._get(ISSUE_EXTRACTOR.githubUrl + '/' + prOrIssue.number + '/labels')
      .subscribe((res: Response) => {
        var labels = res.json();
        console.log('Updating: ', prOrIssue.number, labels);
        var db = this.af.database;
        var open = db.object(extractor.rawUrl + '/open/' + prOrIssue.number);
        var close = db.object(extractor.rawUrl + '/close/' + prOrIssue.number);
        var openDigest = db.object(extractor.digestUrl + '/open/' + prOrIssue.number);
        var closeDigest = db.object(extractor.digestUrl + '/close/' + prOrIssue.number);
        var digest = extractor.digest(prOrIssue, labels)
        if (prOrIssue.closed_at) {
          close.set(prOrIssue);
          closeDigest.set(digest);
          open.remove();     
          openDigest.remove(); 
        } else {
          open.set(prOrIssue);
          openDigest.set(digest);
          close.remove();
          closeDigest.remove();
        }
      });    
  }
  
  private _get(path: string, params: {[k:string]: any} = {}): Observable<Response> {
    var authState: FirebaseAuthState = this.af.auth.getAuth();
    var accessToken: string = authState.github.accessToken;
    var qParams = [];
    Object.keys(params).forEach((key) => qParams.push(key + '=' + params[key]));
    return this.http.get('https://api.github.com/repos/angular/angular' 
        + path + '?' + qParams.join('&'), {
          headers: new Headers({"Authorization": "token " + accessToken})
        });
  }
}

abstract class Extractor {
  githubUrl: string;
  rawUrl: string;
  digestUrl: string;
  
  digest(prOrIssue: PullRequest | Issue, labels: LabelRef[]): Digest {
    return {
      number: prOrIssue.number,
      title: prOrIssue.title,
      assigned: prOrIssue.assignee ? prOrIssue.assignee.login : null,
      author: prOrIssue.user ? prOrIssue.user.login : null,
      created_at: parseDate(prOrIssue.created_at),
      updated_at: parseDate(prOrIssue.updated_at),
      labels: extractLabels(labels),
      comments: prOrIssue.comments || 0
    };
  }
}

class PrExtractor extends Extractor {
  githubUrl = '/pulls';
  rawUrl = '/github/pulls';
  digestUrl = '/digest/pulls';

}

class IssueExtractor extends Extractor {
  githubUrl = '/issues';
  rawUrl = '/github/issues';
  digestUrl = '/digest/issues';

}

export interface Digest {
  number: number;
  title: string;
  assigned: string;
  author: string;
  created_at: number;
  updated_at: number;
  labels: {[key:string]: string};
  comments: number;
}

const LABEL_REGEXP = /^(\w+)(\d*)\:\s*(.*)$/;

function extractLabels(labels: LabelRef[]): {[key:string]: string} {
  var labelsMap: {[key:string]: string} = {};
  (labels || []).map((ref) => {
    var parts = LABEL_REGEXP.exec(ref.name);
    var key = parts[1];
    var value = parts[3];
    if (parts[2]) {
      value = parts[2] + ': ' + value;
    }
    labelsMap[key] = value;
  });
  console.log('Labels', labelsMap, labels);
  return labelsMap;
}

function parseDate(date: string): number {
  return date ? new Date(date).getTime() : null;
}

const PR_EXTRACTOR = new PrExtractor();
const ISSUE_EXTRACTOR = new IssueExtractor();
