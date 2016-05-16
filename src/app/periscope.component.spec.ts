import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { PeriscopeAppComponent } from '../app/periscope.component';

beforeEachProviders(() => [PeriscopeAppComponent]);

describe('App: Periscope', () => {
  it('should create the app',
      inject([PeriscopeAppComponent], (app: PeriscopeAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'periscope works!\'',
      inject([PeriscopeAppComponent], (app: PeriscopeAppComponent) => {
    expect(app.title).toEqual('periscope works!');
  }));
});
