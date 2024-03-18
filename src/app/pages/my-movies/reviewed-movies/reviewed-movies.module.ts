import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewedMoviesPageRoutingModule } from './reviewed-movies-routing.module';

import { ReviewedMoviesPage } from './reviewed-movies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewedMoviesPageRoutingModule
  ],
  declarations: [ReviewedMoviesPage]
})
export class ReviewedMoviesPageModule {}
