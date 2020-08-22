import { Component, OnInit } from '@angular/core';
import { LogEntry } from '../model/log-entry'
import { HttpService } from '../services/http-service'

@Component({
  selector: 'app-log-entry',
  templateUrl: './log-entry.component.html'
})

export class LogEntryComponent implements OnInit {
  fetching: boolean
  logEntries: LogEntry[] = []

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getLogEntries()
  }

  getLogEntries() {
    this.fetching = true
    this.httpService.get(`http://localhost:8080/api/iqueue/log`)
    // this.httpService.get(`https://localhost:8443/api/iqueue/log`)
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
