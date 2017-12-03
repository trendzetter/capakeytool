import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
//import 'rxjs/add/operator/delay';

import { Requester, requesters } from './data-model';

@Injectable()
export class RequesterService {

  //delayMs = 500;
  requestIdCounter = 2;

  // Fake server get; assume nothing can go wrong
  getRequesters(): Observable<Requester[]> {
    return of(requesters); // simulate latency with delay
  }

  addRequester(): Requester {
    let requester = new Requester();
    requester.id = this.requestIdCounter as number;
    requester.name = "Nieuwe aanvrager";
    requester.parcels = [];
    requesters.push(requester);
    this.requestIdCounter++;
    return requester;
  }

  // Fake server update; assume nothing can go wrong
  updateRequester(requester: Requester): Observable<Requester>  {
    const oldRequester = requesters.find(h => h.id === requester.id);
    const newRequester = Object.assign(oldRequester, requester); // Demo: mutate cached requester
    return of(newRequester); // simulate latency with delay
  }
}
