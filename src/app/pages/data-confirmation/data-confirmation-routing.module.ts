import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataConfirmationPage } from './data-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: DataConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataConfirmationPageRoutingModule {}
