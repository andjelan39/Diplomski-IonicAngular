import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ReviewModel } from 'src/app/review.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reviewed-movie-element',
  templateUrl: './reviewed-movie-element.component.html',
  styleUrls: ['./reviewed-movie-element.component.scss'],
})
export class ReviewedMovieElementComponent implements OnInit {
  @Input() review!: ReviewModel;
  imageBaseUrl = environment.images;

  constructor(
    private moviesService: MovieService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}
}
