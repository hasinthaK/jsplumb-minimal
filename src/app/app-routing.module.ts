import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './routing.constants';
import { PocReteJsComponent } from './poc-rete-js/poc-rete-js.component';
import { DefaultComponent } from './default/default.component';
import { PocJsplumbComponent } from './poc-jsplumb/poc-jsplumb.component';

const routes: Routes = [
  { path: ROUTES.RETEJS, component: PocReteJsComponent },
  { path: ROUTES.JSPLUMB, component: PocJsplumbComponent },
  { path: '', component: DefaultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
