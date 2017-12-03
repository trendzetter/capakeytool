import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

import { Requester }        from './data-model';
import { RequesterService } from './requester.service';

@Component({
  selector: 'app-requester-list',
  templateUrl: './requester-list.component.html'
})
export class RequesterListComponent implements OnInit {
  requesters: Observable<Requester[]>;
  isLoading = false;
  selectedRequester: Requester;

  constructor(private requesterService: RequesterService) { }

  ngOnInit() { this.getRequesters(); }

  addRequester() {
    this.select(this.requesterService.addRequester());
  }

  export() {
    let requesters: Requester[];
    this.requesterService.getRequesters().subscribe((data: Requester[]) => requesters = data);
    let requestersOut = [];
    requestersOut.push(['Naam','Straat','Postcode','Gemeente','perceel_gemeente','afdeling','sectie','capakey']);
    requesters.forEach(eachRequester => {
      eachRequester.parcels.forEach(eachParcel => {
        requestersOut.push([eachRequester.name, eachRequester.street,eachRequester.zip,eachRequester.city,eachParcel.municipality,eachParcel.department,eachParcel.section,eachParcel.capakey]);
      })
    });
    new Angular2Csv(requestersOut, 'Capakey lijst');
  }

  getRequesters() {
    this.isLoading = true;
    this.requesters = this.requesterService.getRequesters()
                      // Todo: error handling
                      .finally(() => this.isLoading = false);
    this.selectedRequester = undefined;
  }

  select(requester: Requester) {
    this.selectedRequester = requester;
  }

}
