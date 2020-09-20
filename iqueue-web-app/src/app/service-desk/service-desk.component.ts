import { Component, OnInit } from '@angular/core';
import { Attendance } from '../model/attendance'
import { AttendanceTicket } from '../model/attendance-ticket'
import { HttpService } from '../services/http-service'
import { DatePipe } from '@angular/common'
import { UriBuilderService } from '../services/uri-builder-service'

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

  readonly IN_ATTENDANCE_STATUS_ID = 2
  readonly ATTENDANCE_DONE_STATUS_ID = 3
  readonly ATTENDANCE_QUIT_STATUS_ID = 4

  constructor(private httpService: HttpService,
    private datePipe: DatePipe,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    this.getWaitingCount()
  }

  getWaitingCount() {
    this.deskId = localStorage.getItem('deskId')
    this.httpService
      .get(this.uriBuilderService.getServiceQueueWaitingCountUri(this.deskId))
      .subscribe(responseData => {
        this.waitingCount = responseData['waitingCount']
        this.getWaitingCount()
      })
  }

  onCallNext() {
    this.httpService
      .get(this.uriBuilderService.getNextAttendanceUri(this.deskId))
      .subscribe(responseData => {
        this.attendance.attendanceId = responseData['attendanceId']
        this.attendance.serviceQueueId = responseData['serviceQueueId']
        this.attendance.deskId = parseInt(this.deskId)
        this.attendance.clientId = responseData['clientId']
        this.attendance.startWaitingDateTime = responseData['startWaitingDateTime']
        this.attendance.startAttendanceDateTime = this.getCurrentDateTime()
        this.attendance.endAttendanceDateTime = null
        this.attendance.attendanceStatusId = this.IN_ATTENDANCE_STATUS_ID

        this.updateAttendance()
        this.getWaitingCount()
        this.getAttendanceTicket()
      })
  }

  updateAttendance() {
    this.httpService
      .update(this.uriBuilderService.getAttendanceUri(this.attendance.attendanceId),
        this.attendance)
      .subscribe(responseData => {
        console.log(this.attendance)
      })
  }

  getAttendanceTicket() {
    this.httpService
      .get(this.uriBuilderService.getAttendanceTicketUri(this.attendance.attendanceId))
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
    this.attendance.attendanceStatusId = this.ATTENDANCE_DONE_STATUS_ID
    this.updateAttendance()
    this.getWaitingCount()
  }

  onSetQuit() {
    this.attendance.attendanceStatusId = this.ATTENDANCE_QUIT_STATUS_ID
    this.updateAttendance()
    this.getWaitingCount()
  }

  private getCurrentDateTime() {
    return this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-ddTHH:mm:ss')
  }

}
