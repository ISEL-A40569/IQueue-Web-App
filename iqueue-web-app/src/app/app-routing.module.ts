import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperatorComponent } from './operator/operator.component'
import { OperatorsComponent } from './operator/operators/operators.component';
import { BeaconComponent } from './beacon/beacon.component'
import { BeaconsComponent } from './beacon/beacons/beacons.component';

const routes: Routes = [
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
