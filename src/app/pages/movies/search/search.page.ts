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
  imageBaseUrl = environment.images;
  query: string = '';
  searchResults: any;

  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.movieSub) {
      this.movieSub.unsubscribe;
    }
  }

  searchMovies() {
    if (this.query.trim() !== '') {
      this.movieSub = this.movieService
        .searchMovies(this.query)
        .subscribe((res) => {
          this.searchResults = res;
        });
    } else {
      this.searchResults = null;
    }
  }
}
