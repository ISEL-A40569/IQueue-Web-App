import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperatorComponent } from './operator/operator.component'
import { OperatorsComponent } from './operator/operators/operators.component';
import { BeaconComponent } from './beacon/beacon.component'
import { BeaconsComponent } from './beacon/beacons/beacons.component';
import { ServiceQueueComponent } from './service-queue/service-queue.component'
import { ServiceQueuesComponent } from './service-queue/service-queues/service-queues.component'
import { UserComponent } from './user/user.component'
import { UsersComponent } from './user/users/users.component'
 
const routes: Routes = [
  { path: 'user/:userId', component: UserComponent },
  { path: 'user', component: UserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'servicequeue/:serviceQueueId/:operatorId', component: ServiceQueueComponent },
  { path: 'servicequeue', component: ServiceQueueComponent },
  { path: 'servicequeues', component: ServiceQueuesComponent },
  { path: 'operator/:operatorId', component: OperatorComponent },
  { path: 'operator', component: OperatorComponent },
  { path: 'operators', component: OperatorsComponent },
  { path: 'beacon/:beaconId', component: BeaconComponent },
  { path: 'beacon', component: BeaconComponent },
  { path: 'beacons', component: BeaconsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
