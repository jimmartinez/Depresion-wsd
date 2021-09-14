import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisEncuestasPage } from './mis-encuestas.page';

const routes: Routes = [
  {
    path: '',
    component: MisEncuestasPage
  },
  {
    path: 'informacion',
    loadChildren: () => import('../informacion/informacion.module').then( m => m.InformacionPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisEncuestasPageRoutingModule {}
