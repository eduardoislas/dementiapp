import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataConfirmationPageRoutingModule } from './data-confirmation-routing.module';

import { DataConfirmationPage } from './data-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataConfirmationPageRoutingModule
  ],
  declarations: [DataConfirmationPage]
})
export class DataConfirmationPageModule { }
