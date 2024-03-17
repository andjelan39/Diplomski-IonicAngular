import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMoviesPage } from './my-movies.page';

const routes: Routes = [
  {
    path: '',
    component: MyMoviesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMoviesPageRoutingModule {}
