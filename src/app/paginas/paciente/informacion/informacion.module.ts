import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionPageRoutingModule } from './informacion-routing.module';

import { InformacionPage } from './informacion.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from 'src/app/loading/loading.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionPageRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    

  ],
  declarations: [
  InformacionPage,
  LoadingComponent,
]
})
export class InformacionPageModule {}
