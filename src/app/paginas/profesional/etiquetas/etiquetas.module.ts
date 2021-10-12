import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtiquetasPageRoutingModule } from './etiquetas-routing.module';

import { EtiquetasPage } from './etiquetas.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtiquetasPageRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [EtiquetasPage]
})
export class EtiquetasPageModule {}
