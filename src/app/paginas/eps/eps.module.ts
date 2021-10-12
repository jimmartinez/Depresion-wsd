import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EpsPageRoutingModule } from './eps-routing.module';

import { EpsPage } from './eps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EpsPageRoutingModule
  ],
  declarations: [EpsPage]
})
export class EpsPageModule {}
