import {PeriscopeModuleNgFactory} from './ngfactory/app/module.ngfactory';
import {platformBrowser} from '@angular/platform-browser';

console.log('static mode')
platformBrowser().bootstrapModuleFactory(PeriscopeModuleNgFactory);
