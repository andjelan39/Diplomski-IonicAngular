import { Component, OnInit, ViewChild } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonContent,
  LoadingController,
} from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.page.html',
  styleUrls: ['./popular-movies.page.scss'],
})
export class PopularMoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(
    private movieService: MovieService,
    private loadingCtrl: LoadingController
  ) {}
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  ngOnInit() {
    this.loadMovies();
  }

  scrollToTop() {
    this.content.scrollToTop(300);
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getPopularMovies(this.currentPage).subscribe((res) => {
      loading.dismiss();
      this.movies.push(...res.results);
      console.log(res);

      event?.target.complete();
      if (event) {
        event.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
