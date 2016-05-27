import { Component, Injectable, forwardRef } from '@angular/core';
import { PrComponent } from '../pr/pr.component';
import { PrBoardService, Staleness } from '../pr-board.service';


@Component({
  moduleId: module.id,
  selector: 'app-triage-pr',
  templateUrl: 'triage-pr.component.html',
  styleUrls: ['triage-pr.component.css'],
  directives: [PrComponent]
})
export class TriagePrComponent {
  state: PrBoardService;

  constructor(prState: PrBoardService) {
    console.log('Triage');
    this.state = prState;
  }
  
  sum(s: Staleness) {
    return s.length;
  }
}
