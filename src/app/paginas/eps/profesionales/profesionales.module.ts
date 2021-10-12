import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesionalesPageRoutingModule } from './profesionales-routing.module';

import { ProfesionalesPage } from './profesionales.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesionalesPageRoutingModule,
    NgbModule,
    ReactiveFormsModule,


  ],
  declarations: [ProfesionalesPage]
})
export class ProfesionalesPageModule {}
