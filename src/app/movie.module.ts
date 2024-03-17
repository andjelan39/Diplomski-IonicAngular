import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieElementComponent } from './pages/movie-element/movie-element.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [MovieElementComponent],
  exports: [MovieElementComponent],
})
export class MovieModule {}
