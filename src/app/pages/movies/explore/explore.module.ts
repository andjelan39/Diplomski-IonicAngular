import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { MovieModule } from 'src/app/movie.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    MovieModule
  ],
  declarations: [ExplorePage]
})
export class ExplorePageModule {}
