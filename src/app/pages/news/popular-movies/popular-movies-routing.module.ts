import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularMoviesPage } from './popular-movies.page';

const routes: Routes = [
  {
    path: '',
    component: PopularMoviesPage
  },
  {
    path: ':id',
    loadChildren: () => import('../../movie-details/movie-details.module').then( m => m.MovieDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularMoviesPageRoutingModule {}
