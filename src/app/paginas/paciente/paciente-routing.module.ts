import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientePage } from './paciente.page';

const routes: Routes = [
  {
    path: '',
    component: PacientePage
  },
  {
    path: 'informacion',
    loadChildren: () => import('./informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'mis-encuestas',
    loadChildren: () => import('./mis-encuestas/mis-encuestas.module').then( m => m.MisEncuestasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientePageRoutingModule {}
