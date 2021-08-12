import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisEncuestasPageRoutingModule } from './mis-encuestas-routing.module';

import { MisEncuestasPage } from './mis-encuestas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisEncuestasPageRoutingModule
  ],
  declarations: [MisEncuestasPage]
})
export class MisEncuestasPageModule {}
