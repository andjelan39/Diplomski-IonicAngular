import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMoviesPageRoutingModule } from './my-movies-routing.module';

import { MyMoviesPage } from './my-movies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyMoviesPageRoutingModule
  ],
  declarations: [MyMoviesPage]
})
export class MyMoviesPageModule {}
