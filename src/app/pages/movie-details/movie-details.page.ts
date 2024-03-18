import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  imageBaseUrl = environment.images;
  director!: string;
  actors: any[] = [];

  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.movieService.getMovieDetails(this.id).subscribe((res) => {
      console.log(res);
      this.movie = res;
      this.getMovieCredits();
    });
  }

  getMovieCredits() {
    this.movieService.getMovieCredits(this.id).subscribe((res) => {
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
}
