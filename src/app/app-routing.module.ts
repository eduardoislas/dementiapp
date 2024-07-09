import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'informedconsent',
    loadChildren: () => import('./pages/informed-consent/informed-consent.module').then( m => m.InformedConsentPageModule)
  },
  {
    path: 'dataconfirmation',
    loadChildren: () => import('./pages/data-confirmation/data-confirmation.module').then( m => m.DataConfirmationPageModule)
  },
  {
    path: 'assistant',
    loadChildren: () => import('./pages/assistant/assistant.module').then( m => m.AssistantPageModule)
  },
  {
    path: 'patientdata',
    loadChildren: () => import('./pages/patient-data/patient-data.module').then( m => m.PatientDataPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
