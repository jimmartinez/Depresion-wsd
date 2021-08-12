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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
