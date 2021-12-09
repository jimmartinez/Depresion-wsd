import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntajesPageRoutingModule } from './puntajes-routing.module';

import { PuntajesPage } from './puntajes.page';
import { SearchComponent } from 'src/app/search/search.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntajesPageRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PuntajesPage,
    SearchComponent,
    SearchPipe]
})
export class PuntajesPageModule {}
