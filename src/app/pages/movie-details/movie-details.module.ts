import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailsPageRoutingModule } from './movie-details-routing.module';

import { MovieDetailsPage } from './movie-details.page';
import { CastElementComponent } from '../cast-element/cast-element.component';
import { ReviewElementComponent } from '../review-element/review-element.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailsPageRoutingModule
  ],
  declarations: [MovieDetailsPage, CastElementComponent, ReviewElementComponent]
})
export class MovieDetailsPageModule {}
