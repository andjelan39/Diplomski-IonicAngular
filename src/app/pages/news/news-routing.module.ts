import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsPage } from './news.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: NewsPage,
    children: [
      {
        path: 'popular-movies',
        loadChildren: () => import('./popular-movies/popular-movies.module').then( m => m.PopularMoviesPageModule)
      },
      {
        path: 'articles',
        loadChildren: () => import('./articles/articles.module').then( m => m.ArticlesPageModule)
      },
      {
        path: '',
        redirectTo: '/news/tabs/popular-movies',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/news/tabs/popular-movies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsPageRoutingModule {}
