import { Component, OnInit } from '@angular/core';
import { LogEntry } from '../model/log-entry'
import { HttpService } from '../services/http-service'
import { UriBuilderService } from '../services/uri-builder-service'

@Component({
  selector: 'app-log-entry',
  templateUrl: './log-entry.component.html'
})

export class LogEntryComponent implements OnInit {
  fetching: boolean
  logEntries: LogEntry[] = []

  constructor(private httpService: HttpService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    this.getLogEntries()
  }

  getLogEntries() {
    this.fetching = true
    this.httpService.get(this.uriBuilderService.getLogUri())
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.logEntries.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
      })
  }

}
