import {Injectable} from '@angular/core';

import {GithubStore, Digest} from './github/store';

const Label = {
  LGTM: 'pr_state: LGTM',
  Merge: 'pr_action: merge',
  Cleanup: 'pr_action: cleanup'
}

@Injectable() export class PrBoardService {
  untriaged = new Staleness();
  assigned = new Staleness();
  reviewed = new Staleness();
  cleanup = new Staleness();
  ready = new Staleness();
  other = new Staleness();

  constructor(store: GithubStore) {
    store.getOpenPrDigests().subscribe((prs) => this.classify(prs));
  }

  classify(prs: Digest[]) {
    this.untriaged.reset();
    this.assigned.reset();
    this.reviewed.reset();
    this.cleanup.reset();
    this.ready.reset();
    this.other.reset();
    prs.forEach(pr => this.categorize(pr));
    this.untriaged.sort();
    this.assigned.sort();
    this.reviewed.sort();
    this.cleanup.sort();
    this.ready.sort();
    this.other.sort();
  }


  categorize(pr: Digest) {
    var labels = pr.labels || {};
    if (pr.number == 8350) {
      console.log(pr);
    }
    if (!pr.assigned) {
      this.untriaged.add(pr)
    } else if (labels['pr_action'] == 'cleanup') {
      this.cleanup.add(pr);
    } else if (labels['pr_state'] == 'LGTM') {
      if (labels['pr_action'] == 'merge') {
        this.ready.add(pr);
      } else {
        this.reviewed.add(pr);
      }
    } else {
      this.assigned.add(pr);
    }
  }
}

export class Staleness {
  static MINUTE = 60 * 1000;
  static HOUR = 60 * Staleness.MINUTE;
  static HOURS = 2 * Staleness.HOUR;
  static DAY = 24 * Staleness.HOUR;
  static DAYS = 2 * Staleness.DAY;
  static WEEK = 7 * Staleness.DAY;
  static WEEKS = 2 * Staleness.WEEK;
  static MONTH = 4 * Staleness.WEEK;
  static MONTHS = 2 * Staleness.MONTH;
  static BUCKETS = [
    Staleness.HOUR,
    Staleness.HOURS,
    Staleness.DAY,
    Staleness.DAYS,
    Staleness.WEEK,
    Staleness.WEEKS,
    Staleness.MONTH,
    Staleness.MONTHS,
    Number.MAX_VALUE,
  ];

  hour: Digest[] = [];
  hours: Digest[] = [];
  day: Digest[] = [];
  days: Digest[] = [];
  week: Digest[] = [];
  weeks: Digest[] = [];
  month: Digest[] = [];
  months: Digest[] = [];

  buckets: Digest[][];

  constructor() {
    this.buckets = [
      this.hour,
      this.hours,
      this.day,
      this.days,
      this.week,
      this.weeks,
      this.month,
      this.months,
    ];
  }

  get length(): number {
    return 0 + this.day.length + this.days.length + this.week.length + this.weeks.length +
        this.month.length + this.months.length;
  }

  reset() { this.buckets.forEach(bucket => bucket.length = 0); }

  add(d: Digest) {
    var delay = new Date().getTime() - d.updated_at;
    for (var index = 0; index < Staleness.BUCKETS.length; index++) {
      if (delay < Staleness.BUCKETS[index]) {
        this.buckets[index].push(d);
        return;
      }
    }
  }

  sort() { this.buckets.forEach(bucket => bucket.sort(Staleness.sortByAge)); }

  static sortByAge(a: Digest, b: Digest): number { return 0; }
}
