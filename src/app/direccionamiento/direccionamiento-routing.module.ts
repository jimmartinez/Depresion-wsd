import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionamientoPage } from './direccionamiento.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionamientoPageRoutingModule {}
