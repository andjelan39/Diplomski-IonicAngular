import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewedMoviesPage } from './reviewed-movies.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewedMoviesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewedMoviesPageRoutingModule {}
