import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpsPage } from './eps.page';

const routes: Routes = [
  {
    path: '',
    component: EpsPage
  },
  {
    path: 'profesionales',
    loadChildren: () => import('./profesionales/profesionales.module').then( m => m.ProfesionalesPageModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./informacion/informacion.module').then( m => m.InformacionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpsPageRoutingModule {}
