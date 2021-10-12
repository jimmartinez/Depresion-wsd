import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtiquetasPage } from './etiquetas.page';

const routes: Routes = [
  {
    path: '',
    component: EtiquetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtiquetasPageRoutingModule {}
