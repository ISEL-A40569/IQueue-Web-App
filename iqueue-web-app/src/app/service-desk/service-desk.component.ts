import { Component, OnInit } from '@angular/core';
import { Attendance } from '../model/attendance'
import { AttendanceTicket } from '../model/attendance-ticket'
import { HttpService } from '../services/http-service'

@Component({
  selector: 'app-service-desk',
  templateUrl: './service-desk.component.html'
})
export class ServiceDeskComponent implements OnInit {
  deskId: string
  waitingCount: number
  attendance: Attendance = new Attendance()
  attendanceTicket: AttendanceTicket = new AttendanceTicket()

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {    
    this.getWaitingCount()
  }

  getWaitingCount() {
    this.deskId = localStorage.getItem('deskId')
    this.httpService.get(`https://localhost:8443/api/iqueue/servicequeue/waitingcount/${this.deskId}`)
      .subscribe(responseData => {
        this.waitingCount = responseData['waitingCount']
      })
  }

  onCallNext() {
    this.httpService.get(`https://localhost:8443/api/iqueue/attendance/next/${this.deskId}`)
      .subscribe(responseData => {
        this.attendance.attendanceId = responseData['attendanceId']
        this.attendance.serviceQueueId = responseData['serviceQueueId']
        this.attendance.deskId = parseInt(this.deskId)
        this.attendance.clientId = responseData['clientId']
        this.attendance.startWaitingDateTime = responseData['startWaitingDateTime']
        this.attendance.startAttendanceDateTime = new Date(Date.now())
        this.attendance.endAttendanceDateTime = null
        this.attendance.attendanceStatusId = 2

        this.updateAttendance()
        this.getAttendanceTicket()
        this.getWaitingCount()
      })
  }

  updateAttendance() {
    this.httpService.update(`https://localhost:8443/api/iqueue/attendance/${this.attendance.attendanceId}`,
      this.attendance)
      .subscribe(responseData => {
      })
  }

  getAttendanceTicket() {
    this.httpService.get(`https://localhost:8443/api/iqueue/attendance/${this.attendance.attendanceId}/ticket`)
      .subscribe(responseData => {
        this.attendanceTicket.attendanceId = responseData['attendanceId']
        this.attendanceTicket.ticketNumber = responseData['ticketNumber']
      })
  }

  onCallAgain() {
    // TODO
  }

  onFinishAttendance() {
    this.attendance.endAttendanceDateTime = new Date(Date.now())
    this.attendance.attendanceStatusId = 3
    this.updateAttendance()
    this.getWaitingCount()
  }

  onSetQuit() {
    this.attendance.attendanceStatusId = 4
    this.updateAttendance()
    this.getWaitingCount()
  }

}
