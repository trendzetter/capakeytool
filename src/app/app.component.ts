import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Capakey Tool</h1>
    <app-requester-list></app-requester-list>
  </div>`
})
export class AppComponent { }
