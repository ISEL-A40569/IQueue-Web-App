import { Component, OnInit } from '@angular/core';
import { LogEntry } from '../model/log-entry'
import { HttpService } from '../services/http-service'
import { UriBuilderService } from '../services/uri-builder-service'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-log-entry',
  templateUrl: './log.component.html',
  providers: [DatePipe]
})

export class LogComponent implements OnInit {
  fetching: boolean
  logEntries: LogEntry[] = []
  date: Date

  constructor(private httpService: HttpService,
    private uriBuilderService: UriBuilderService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.date = new Date()
    this.getLogEntries()
  }

  getLogEntries() {
    console.log(this.date)
    this.fetching = true
    this.httpService.get(this.uriBuilderService.getLogUri(this.formatDate()))
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.logEntries.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
        this.logEntries = []
      })
  }

  onDateChanged() {
    this.logEntries = []
    this.getLogEntries()
  }

  private formatDate() {
    return this.datePipe.transform(this.date, 'yyyy-MM-dd')
  }
}
