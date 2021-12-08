import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientesPageRoutingModule } from './pacientes-routing.module';

import { PacientesPage } from './pacientes.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from 'src/app/search/search.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacientesPageRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PacientesPage,
    SearchComponent,
    SearchPipe,
  ]
})
export class PacientesPageModule {}
