import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistantPageRoutingModule } from './assistant-routing.module';

import { AssistantPage } from './assistant.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AssistantPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AssistantPage]
})
export class AssistantPageModule {}
