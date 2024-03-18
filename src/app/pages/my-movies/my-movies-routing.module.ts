import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMoviesPage } from './my-movies.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MyMoviesPage,
    children: [
      {
        path: 'reviewed-movies',
        loadChildren: () => import('./reviewed-movies/reviewed-movies.module').then( m => m.ReviewedMoviesPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/my-movies/tabs/reviewed-movies',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/my-movies/tabs/reviewed-movies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMoviesPageRoutingModule {}
