import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisEncuestasPageRoutingModule } from './mis-encuestas-routing.module';

import { MisEncuestasPage } from './mis-encuestas.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from 'src/app/loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisEncuestasPageRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MisEncuestasPage,
    LoadingComponent,
]
})
export class MisEncuestasPageModule {}