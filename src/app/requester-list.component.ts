import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

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
    this.requesterService.addRequester();
  }

  getRequesters() {
    this.isLoading = true;
    this.requesters = this.requesterService.getRequesters()
                      // Todo: error handling
                      .finally(() => this.isLoading = false);
    this.selectedRequester = undefined;
  }

  select(requester: Requester) { this.selectedRequester = requester; }

}
