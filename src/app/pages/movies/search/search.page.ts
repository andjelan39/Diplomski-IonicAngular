import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  movies: any[] = [];
  private movieSub!: Subscription;
  public results: any[] = [...this.movies];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieSub = this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) => {
        this.movies.push(...res.results);
        console.log(res);
      });
  }

  ngOnDestroy() {
    if (this.movieSub) {
      this.movieSub.unsubscribe;
    }
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.movies.filter(
      (movie) => movie.title.toLowerCase().indexOf(query) > -1
    );
  }
  
}
