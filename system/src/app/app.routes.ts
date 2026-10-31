import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Sites profissionais para pequenos negócios',
    loadComponent: () => import('@features/views/home/home').then((module) => module.Home),
  },
  { path: '**', redirectTo: '' },
];
