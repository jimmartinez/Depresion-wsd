import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisEncuestasPage } from './mis-encuestas.page';

const routes: Routes = [
  {
    path: '',
    component: MisEncuestasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisEncuestasPageRoutingModule {}
