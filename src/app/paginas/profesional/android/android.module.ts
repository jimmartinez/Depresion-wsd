import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AndroidPageRoutingModule } from './android-routing.module';

import { AndroidPage } from './android.page';
import { SearchComponent } from 'src/app/search/search.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AndroidPageRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    AndroidPage,
    SearchComponent,
    SearchPipe]
})
export class AndroidPageModule {}

