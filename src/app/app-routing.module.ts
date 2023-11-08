import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'paciente',
    loadChildren: () => import('./paginas/paciente/paciente.module').then( m => m.PacientePageModule)
  },
  {
    path: 'pacienteInformacion',
    loadChildren: () => import('./paginas/paciente/informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'pacienteEncuestas',
    loadChildren: () => import('./paginas/paciente/mis-encuestas/mis-encuestas.module').then( m => m.MisEncuestasPageModule)
  },
  {
    path: 'eps',
    loadChildren: () => import('./paginas/eps/eps.module').then( m => m.EpsPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.component').then( m => m.LoadingComponent)
  },
  {
    path: 'direccionamiento',
    loadChildren: () => import('./direccionamiento/direccionamiento.module').then( m => m.DireccionamientoPageModule)
  },
  {
    path: 'profesionales',
    loadChildren: () => import('./paginas/eps/profesionales/profesionales.module').then( m => m.ProfesionalesPageModule)
  },
  {
    path: 'informacionEps',
    loadChildren: () => import('./paginas/eps/informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'profesional',
    loadChildren: () => import('./paginas/profesional/profesional.module').then( m => m.ProfesionalPageModule)
  },
  {
    path: 'formularios',
    loadChildren: () => import('./paginas/profesional/formularios/formularios.module').then( m => m.FormulariosPageModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./paginas/profesional/pacientes/pacientes.module').then( m => m.PacientesPageModule)
  },
  {
    path: 'etiquetas',
    loadChildren: () => import('./paginas/profesional/etiquetas/etiquetas.module').then( m => m.EtiquetasPageModule)
  },
  {
    path: 'puntajes',
    loadChildren: () => import('./paginas/profesional/puntajes/puntajes.module').then( m => m.PuntajesPageModule)
  },
  {
    path: 'android',
    loadChildren: () => import('./paginas/profesional/android/android.module').then( m => m.AndroidPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
