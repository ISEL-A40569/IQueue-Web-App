import { Component, OnInit } from '@angular/core';
import { Attendance } from '../model/attendance'
import { AttendanceTicket } from '../model/attendance-ticket'
import { HttpService } from '../services/http-service'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-service-desk',
  templateUrl: './service-desk.component.html',
  providers: [DatePipe]
})
export class ServiceDeskComponent implements OnInit {
  deskId: string
  waitingCount: number
  attendance: Attendance = new Attendance()
  attendanceTicket: AttendanceTicket = new AttendanceTicket()

  constructor(private httpService: HttpService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {    
    this.getWaitingCount()
  }

  getWaitingCount() {
    this.deskId = localStorage.getItem('deskId')
    this.httpService.get(`http://localhost:8080/api/iqueue/servicequeue/waitingcount/${this.deskId}`)
    // this.httpService.get(`https://localhost:8443/api/iqueue/servicequeue/waitingcount/${this.deskId}`)
      .subscribe(responseData => {
        this.waitingCount = responseData['waitingCount']
        this.getWaitingCount()
      })
  }

  onCallNext() {
    console.log(this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd HH:mm:ss'))
    this.httpService.get(`http://localhost:8080/api/iqueue/attendance/next/${this.deskId}`)
    // this.httpService.get(`https://localhost:8443/api/iqueue/attendance/next/${this.deskId}`)
      .subscribe(responseData => {
        this.attendance.attendanceId = responseData['attendanceId']
        this.attendance.serviceQueueId = responseData['serviceQueueId']
        this.attendance.deskId = parseInt(this.deskId)
        this.attendance.clientId = responseData['clientId']
        this.attendance.startWaitingDateTime = responseData['startWaitingDateTime']
        this.attendance.startAttendanceDateTime = this.getCurrentDateTime()
        this.attendance.endAttendanceDateTime = null
        this.attendance.attendanceStatusId = 2

        this.updateAttendance()
        this.getWaitingCount()
        this.getAttendanceTicket()        
      })
  }

  updateAttendance() {    
    this.httpService.update(`http://localhost:8080/api/iqueue/attendance/${this.attendance.attendanceId}`,
    // this.httpService.update(`https://localhost:8443/api/iqueue/attendance/${this.attendance.attendanceId}`,
      this.attendance)
      .subscribe(responseData => {
        console.log(this.attendance)
      })
  }

  getAttendanceTicket() {
    this.httpService.get(`http://localhost:8080/api/iqueue/attendance/${this.attendance.attendanceId}/ticket`)
    // this.httpService.get(`https://localhost:8443/api/iqueue/attendance/${this.attendance.attendanceId}/ticket`)
      .subscribe(responseData => {
        this.attendanceTicket.attendanceId = responseData['attendanceId']
        this.attendanceTicket.ticketNumber = responseData['ticketNumber']
      })
  }

  onCallAgain() {
    // TODO
  }

  onFinishAttendance() {
    this.attendance.endAttendanceDateTime = this.getCurrentDateTime()
    this.attendance.attendanceStatusId = 3
    this.updateAttendance()
    this.getWaitingCount()
  }

  onSetQuit() {
    this.attendance.attendanceStatusId = 4
    this.updateAttendance()
    this.getWaitingCount()
  }

  getCurrentDateTime() {
    return this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-ddTHH:mm:ss')
  }

}
