import { Component, OnInit } from '@angular/core'
import { ServiceQueueStatistics } from '../model/service-queue-statistics'
import { AttendanceClassification } from '../model/attendance-classification'
import { HttpService } from '../services/http-service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-service-queue-report',
  templateUrl: './service-queue-report.component.html'
})
export class ServiceQueueReportComponent implements OnInit {
  serviceQueueId: number
  serviceQueueStatistics: ServiceQueueStatistics = new ServiceQueueStatistics()
  attendanceClassifications: AttendanceClassification[] = []
  
  constructor(private httpService: HttpService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.serviceQueueId = this.route.snapshot.params['serviceQueueId']
    this.getServiceQueueStatistic()
    this.getAttendanceClassifications()
  }

  getServiceQueueStatistic() {
    this.httpService
      .get(`https://localhost:8443/api/iqueue/servicequeue/${this.serviceQueueId}/statistics`)
      .subscribe(responseData => {
        this.serviceQueueStatistics.attendanceCount = responseData['attendanceCount']
        this.serviceQueueStatistics.averageWaitingTime = responseData['averageWaitingTime']
        this.serviceQueueStatistics.averageAttendanceTime = responseData['averageAttendanceTime']
        this.serviceQueueStatistics.averageRate = responseData['averageRate']
        this.serviceQueueStatistics.quitCount = responseData['quitCount']
      })
  }

  // TODO: THIS IS HORRIBLE, MUST RE-THINK AND RE-WRITE THIS SHIT!!!
  getAttendanceClassifications() {
    this.httpService
      .get(`https://localhost:8443/api/iqueue/attendance?serviceQueueId=${this.serviceQueueId}`)
      .subscribe(responseData => {
        console.log(responseData)

        for (const entry in responseData) {
          const attendanceId = responseData[entry]['attendanceId']

          this.httpService
            .get(`https://localhost:8443/api/iqueue/attendance/${attendanceId}/classification`)
            .subscribe(responseData => {
              let attendanceClassification: AttendanceClassification = new AttendanceClassification()
              attendanceClassification.classificationCreationDateTime = responseData['classificationCreationDateTime']
              attendanceClassification.rate = responseData['rate']
              attendanceClassification.observations = responseData['observations']
              this.attendanceClassifications.push(attendanceClassification)
            })
        }
      })
  }

}
