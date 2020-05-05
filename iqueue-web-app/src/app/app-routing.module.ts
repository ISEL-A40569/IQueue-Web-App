import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperatorComponent } from './operator/operator.component'
import { OperatorsComponent } from './operator/operators/operators.component';

const routes: Routes = [
  { path: 'operator/:operatorId', component: OperatorComponent},
  { path: 'operator', component: OperatorComponent},
  { path: 'operators', component: OperatorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
