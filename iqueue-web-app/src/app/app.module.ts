import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OperatorComponent } from './operator/operator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './services/http-service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OperatorsComponent } from './operator/operators/operators.component';
import { BeaconComponent } from './beacon/beacon.component';
import { BeaconsComponent } from './beacon/beacons/beacons.component';
import { ServiceQueueComponent } from './service-queue/service-queue.component';
import { UserComponent } from './user/user.component';
import { ServiceQueuesComponent } from './service-queue/service-queues/service-queues.component';
import { UsersComponent } from './user/users/users.component';
import { DeskComponent } from './desk/desk.component';
import { DesksComponent } from './desk/desks/desks.component';
import { OperatorBeaconComponent } from './operator-beacon/operator-beacon.component';
import { OperatorBeaconsComponent } from './operator-beacon/operator-beacons/operator-beacons.component';
import { OperatorUserComponent } from './operator-user/operator-user.component';
import { OperatorUsersComponent } from './operator-user/operator-users/operator-users.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogEntryComponent } from './log-entry/log-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    OperatorComponent,
    OperatorsComponent,
    BeaconComponent,
    BeaconsComponent,
    ServiceQueueComponent,
    UserComponent,
    ServiceQueuesComponent,
    UsersComponent,
    DeskComponent,
    DesksComponent,
    OperatorBeaconComponent,
    OperatorBeaconsComponent,
    OperatorUserComponent,
    OperatorUsersComponent,
    ResetPasswordComponent,
    LogEntryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
