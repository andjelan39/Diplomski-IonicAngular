import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewedMoviesPageRoutingModule } from './reviewed-movies-routing.module';

import { ReviewedMoviesPage } from './reviewed-movies.page';
import { ReviewedMovieElementComponent } from '../reviewed-movie-element/reviewed-movie-element.component';
import { EditReviewModalComponent } from '../edit-review-modal/edit-review-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewedMoviesPageRoutingModule
  ],
  declarations: [ReviewedMoviesPage, ReviewedMovieElementComponent, EditReviewModalComponent]
})
export class ReviewedMoviesPageModule {}
