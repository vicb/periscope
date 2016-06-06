import {NgFor} from '@angular/common';
import {Component, Injectable, forwardRef} from '@angular/core';

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
  state: PrBoardService;

  constructor(prState: PrBoardService) {
    console.log('Triage');
    this.state = prState;
  }

  sum(s: Staleness) { return s.length; }
}
