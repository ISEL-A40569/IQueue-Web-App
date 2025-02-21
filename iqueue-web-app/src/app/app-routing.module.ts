import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { OperatorComponent } from './operator/operator.component'
import { OperatorsComponent } from './operator/operators/operators.component'
import { BeaconComponent } from './beacon/beacon.component'
import { BeaconsComponent } from './beacon/beacons/beacons.component'
import { ServiceQueueComponent } from './service-queue/service-queue.component'
import { ServiceQueuesComponent } from './service-queue/service-queues/service-queues.component'
import { UserComponent } from './user/user.component'
import { UsersComponent } from './user/users/users.component'
import { DeskComponent } from './desk/desk.component'
import { DesksComponent } from './desk/desks/desks.component'
import { OperatorBeaconComponent } from './operator-beacon/operator-beacon.component'
import { OperatorBeaconsComponent } from './operator-beacon/operator-beacons/operator-beacons.component'
import { OperatorUserComponent } from './operator-user/operator-user.component'
import { OperatorUsersComponent } from './operator-user/operator-users/operator-users.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { LogComponent } from './log/log.component'
import { DeskUserComponent } from './desk-user/desk-user.component'
import { DeskUsersComponent } from './desk-user/desk-users/desk-users.component'
import { ServiceDeskComponent } from './service-desk/service-desk.component'
import { ServiceQueueReportComponent } from './service-queue-report/service-queue-report.component'
import { LanguageComponent } from './language/language.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'servicedesk', component: ServiceDeskComponent },
  { path: 'desk/:deskId/user', component: DeskUsersComponent },
  { path: 'desk/:deskId/user/:userId', component: DeskUserComponent },
  { path: 'desk/:deskId', component: DeskComponent },
  { path: 'desk', component: DeskComponent },
  { path: 'desks', component: DesksComponent },
  { path: 'user/:userId', component: UserComponent },
  { path: 'user', component: UserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'servicequeue/:serviceQueueId/reports', component: ServiceQueueReportComponent },
  { path: 'servicequeue/:serviceQueueId/desks', component: DesksComponent },
  { path: 'servicequeue/:serviceQueueId', component: ServiceQueueComponent },
  { path: 'servicequeue', component: ServiceQueueComponent },
  { path: 'servicequeues', component: ServiceQueuesComponent },
  { path: 'operator/:operatorId/beacon', component: OperatorBeaconsComponent },
  { path: 'operator/:operatorId/beacon/:beaconId', component: OperatorBeaconComponent },
  { path: 'operator/:operatorId/user', component: OperatorUsersComponent },
  { path: 'operator/:operatorId/user/:userId', component: OperatorUserComponent },
  { path: 'operator/:operatorId', component: OperatorComponent },
  { path: 'operator', component: OperatorComponent },
  { path: 'operators', component: OperatorsComponent },
  { path: 'beacon/:beaconId', component: BeaconComponent },
  { path: 'beacon', component: BeaconComponent },
  { path: 'beacons', component: BeaconsComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'log', component: LogComponent },
  { path: 'language', component: LanguageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
