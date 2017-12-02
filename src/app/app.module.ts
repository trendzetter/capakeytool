import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { HttpClientModule } from '@angular/common/http';


import { AppComponent }        from './app.component';

import { RequesterDetailComponent } from './requester-detail.component'; // <-- #1 import component
import { RequesterListComponent }   from './requester-list.component';

import { RequesterService }         from './requester.service';
import { GeoService }               from './geo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterService, ToasterModule } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { Configuration } from './app.constants';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule, // <-- #2 add to @NgModule imports
    ToasterModule,
    BrowserAnimationsModule,
    NguiAutoCompleteModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    RequesterDetailComponent,
    RequesterListComponent
  ],
  exports: [ // export for the DemoModule
    AppComponent,
    RequesterDetailComponent,
    RequesterListComponent
  ],
  providers: [ RequesterService, Configuration, GeoService, ToasterService ], // <-- #4 provide HeroService
  bootstrap: [ AppComponent ]
})
export class AppModule { }
