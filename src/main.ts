// tslint:disable:no-unused-variable
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module'; // just the final version
import { environment } from './environments/environment';

// noinspection TypeScriptCheckImport
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
