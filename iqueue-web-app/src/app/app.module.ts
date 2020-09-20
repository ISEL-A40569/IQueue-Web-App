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
import { ServiceDeskComponent } from './service-desk/service-desk.component';
import { ServiceQueueReportComponent } from './service-queue-report/service-queue-report.component';
import { DeskUserComponent } from './desk-user/desk-user.component';
import { DeskUsersComponent } from './desk-user/desk-users/desk-users.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http';
import { LanguageComponent } from './language/language.component'

import { UriBuilderService } from './services/uri-builder-service';
import { HomeComponent } from './home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

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
    ServiceDeskComponent,
    ServiceQueueReportComponent,
    DeskUserComponent,
    DeskUsersComponent,
    LanguageComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [HttpService,
    UriBuilderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
