import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReviewModel } from 'src/app/review.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-reviewed-movies',
  templateUrl: './reviewed-movies.page.html',
  styleUrls: ['./reviewed-movies.page.scss'],
})
export class ReviewedMoviesPage implements OnInit {
  reviews!: ReviewModel[];
  private reviewSub!: Subscription;

  constructor(private moviesService: MovieService) {}

  ngOnInit() {
    this.reviewSub = this.moviesService.myreviews.subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  ionViewWillEnter() {
    this.moviesService.getMyReviews().subscribe((reviews) => {});
  }

  ngOnDestroy() {
    if (this.reviewSub) {
      this.reviewSub.unsubscribe();
    }
  }
}
