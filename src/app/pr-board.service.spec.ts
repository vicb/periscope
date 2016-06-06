import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {PrBoardService} from './pr-board.service';

describe('PrBoard Service', () => {
  beforeEachProviders(() => [PrBoardService]);

  it('should ...',
     inject([PrBoardService], (service: PrBoardService) => { expect(service).toBeTruthy(); }));
});
