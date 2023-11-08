import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesionalPage } from './profesional.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesionalPage
  },
  {
    path: 'formularios',
    loadChildren: () => import('./formularios/formularios.module').then( m => m.FormulariosPageModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pacientes/pacientes.module').then( m => m.PacientesPageModule)
  },
  {
    path: 'etiquetas',
    loadChildren: () => import('./etiquetas/etiquetas.module').then( m => m.EtiquetasPageModule)
  },  {
    path: 'puntajes',
    loadChildren: () => import('./puntajes/puntajes.module').then( m => m.PuntajesPageModule)
  },
  {
    path: 'android',
    loadChildren: () => import('./android/android.module').then( m => m.AndroidPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesionalPageRoutingModule {}
