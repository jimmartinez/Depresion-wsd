import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionamientoPageRoutingModule } from './direccionamiento-routing.module';

import { DireccionamientoPage } from './direccionamiento.page';
import { LoadingComponent } from '../loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionamientoPageRoutingModule
  ],
  declarations: [
    DireccionamientoPage,
    LoadingComponent
  ]
})
export class DireccionamientoPageModule {}
