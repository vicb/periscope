import { Injectable } from '@angular/core';
import { PullRequest, Issue, BaseIssue } from './v3';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { 
  AngularFire, 
  FirebaseListObservable, 
  FirebaseObjectObservable 
} from 'angularfire2';


@Injectable()
export class GithubStore {
  constructor(private af: AngularFire, private http: Http) {}
  
  getPrs(): FirebaseListObservable<PullRequest[]> {
    return this.af.database.list('/prs')    
  }
  
  getPr(prNumber: number): FirebaseObjectObservable<PullRequest> {
    return this.af.database.object('/prs/' + prNumber);
  }
  
  updatePr(prNumber: number): FirebaseObjectObservable<PullRequest> {
    this._get('/pulls/' + prNumber )
      .subscribe(
        (prResponse: Response) => this._updateObject('/prs/', prResponse.json()),
        (error: Response) => console.error(error) 
      );
    //TODO: how do I return FirebaseObjectObservable<PullRequest>?
    return null;
  }
  
  updatePrs() {
    var fetchPage = (page: number) => {
      this
        ._get('/pulls', {page: page, state: 'all'})
        .subscribe((prsResponse: Response) => {
          var prs: PullRequest[] = prsResponse.json();
          prs.forEach((pr: PullRequest) => this._updateObject('/prs/', pr));
          if (prs.length) fetchPage(page + 1);
        });
    }
    fetchPage(0);
  }

  
  getIssues(): FirebaseListObservable<Issue[]> {
    return this.af.database.list('/issues')    
  }
  
  getIssue(issueNumber: number): FirebaseObjectObservable<Issue> {
    return this.af.database.object('/issues/' + issueNumber);
  }
  
  updateIssue(issueNumber: number): FirebaseObjectObservable<Issue> {
    this._get('/issues/' + issueNumber )
      .subscribe(
        (issueResponse: Response) => this._updateObject('/issues/', issueResponse.json()),
        (error: Response) => console.error(error) 
      );
    //TODO: how do I return FirebaseObjectObservable<PullRequest>?
    return null;
  }
  
  private _updateObject(path: string, prOrIssue: PullRequest | Issue) {
    this.af.database.object(path + prOrIssue.number).update(prOrIssue);
  }
  
  private _get(path: string, params: {[k:string]: any} = {}): Observable<Response> {
    var qParams = [];
    Object.keys(params).forEach((key) => qParams.push(key + '=' + params[key]));
    return this.http.get('https://api.github.com/repos/angular/angular' 
        + path + '?' + qParams.join('&'));
  }
}
