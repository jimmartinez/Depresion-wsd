import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AndroidPage } from './android.page';

const routes: Routes = [
  {
    path: '',
    component: AndroidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AndroidPageRoutingModule {}
