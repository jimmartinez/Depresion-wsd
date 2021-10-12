import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormulariosPageRoutingModule } from './formularios-routing.module';

import { FormulariosPage } from './formularios.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormulariosPageRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [FormulariosPage]
})
export class FormulariosPageModule {}
