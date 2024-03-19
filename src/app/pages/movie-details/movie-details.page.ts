import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReviewModel } from 'src/app/review.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit, OnDestroy {
  movie: any;
  imageBaseUrl = environment.images;
  director!: string;
  actors: any[] = [];

  reviews!: ReviewModel[];
  private reviewSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe((res) => {
      console.log(res);
      this.movie = res;
      this.getMovieCredits();
    });
    this.reviewSub = this.movieService.reviews.subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  ngOnDestroy() {
    if (this.reviewSub) {
      this.reviewSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getReviews(id).subscribe((reviewData) => {});
  }

  getMovieCredits() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieCredits(id).subscribe((res) => {
      const credits = res;

      const director = credits.crew.find(
        (member: any) => member.job === 'Director'
      );
      this.director = director ? director.name : 'Unknown';
      console.log(director);

      credits.cast.slice(0, 5).forEach((actor: any) => {
        this.actors.push(actor);
      });
      console.log(this.actors);
    });
  }

  addMovieReview(reviewForm: NgForm) {
    this.movieService
      .addReview(reviewForm.value.review, this.movie)
      .subscribe((res) => {});
    reviewForm.reset();
  }
}
