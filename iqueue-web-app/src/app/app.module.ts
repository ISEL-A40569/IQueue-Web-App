import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OperatorComponent } from './operator/operator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OperatorsComponent } from './operator/operators/operators.component';
import { BeaconComponent } from './beacon/beacon.component';
import { BeaconsComponent } from './beacon/beacons/beacons.component';
import { ServiceQueueComponent } from './service-queue/service-queue.component';
import { UserComponent } from './user/user.component';
import { ServiceQueuesComponent } from './service-queue/service-queues/service-queues.component';

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
