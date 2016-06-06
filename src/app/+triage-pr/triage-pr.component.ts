import {NgFor} from '@angular/common';
import {Component} from '@angular/core';

import {PrBoardService, Staleness} from '../pr-board.service';
import {PrComponent} from '../pr/pr.component';


@Component({
  moduleId: module.id,
  selector: 'app-triage-pr',
  templateUrl: 'triage-pr.component.html',
  styleUrls: ['triage-pr.component.css'],
  directives: [PrComponent, NgFor]
})
export class TriagePrComponent {
  constructor(public state: PrBoardService) {}

  sum(s: Staleness): number { return s.length; }
}
