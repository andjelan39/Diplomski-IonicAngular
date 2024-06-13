import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { UserModel } from '../user.model';
import { ReviewModel } from '../review.model';
import { AuthService } from './auth/auth.service';

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

interface ReviewData {
  text: string;
  movie: any;
  user: UserModel;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _reviews = new BehaviorSubject<ReviewModel[]>([]);
  private myReviews = new BehaviorSubject<ReviewModel[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  get myreviews() {
    return this.myReviews.asObservable();
  }

  get reviews() {
    return this._reviews.asObservable();
  }

  reviewForEditing!: ReviewModel;

  setReviewEdit(review: ReviewModel) {
    this.reviewForEditing = review;
  }
  getReviewEdit() {
    return this.reviewForEditing;
  }

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/top_rated?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getPopularMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getMovieDetails(id: string | null) {
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }

  getMovieCredits(id: string | null): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/movie/${id}/credits?api_key=${environment.apiKey}`
    );
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/search/movie?api_key=${environment.apiKey}&query=${query}`
    );
  }

  getReviews(movieId: string | null) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: ReviewData }>(
          'https://movie-app-flicks-default-rtdb.europe-west1.firebasedatabase.app/reviews.json?auth=' +
            token
        );
      }),
      map((reviewData) => {
        const reviews: ReviewModel[] = [];
        for (const key in reviewData) {
          if (
            reviewData.hasOwnProperty(key) &&
            movieId == reviewData[key].movie.id
          ) {
            reviews.push({
              id: key,
              text: reviewData[key].text,
              movie: reviewData[key].movie,
              user: reviewData[key].user,
            });
          }
        }
        return reviews;
      }),
      tap((reviews) => {
        this._reviews.next(reviews);
      })
    );
  }

  addReview(text: string, movie: any) {
    let generatedId: string;
    let userLogged: UserModel | null;
    let newReview: ReviewModel;
    return this.authService.user.pipe(
      take(1),
      switchMap((user) => {
        userLogged = user;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        newReview = new ReviewModel(null, text, movie, userLogged);
        return this.http.post<{ name: string }>(
          'https://movie-app-flicks-default-rtdb.europe-west1.firebasedatabase.app/reviews.json?auth=' +
            token,
          newReview
        );
      }),
      take(1),
      switchMap((reviewData) => {
        generatedId = reviewData.name;
        return this.reviews;
      }),
      take(1),
      tap((reviews) => {
        newReview.id = generatedId;
        this._reviews.next(reviews.concat(newReview));
      })
    );
  }

  getMyReviews() {
    let userLogged: UserModel | null;
    return this.authService.user.pipe(
      take(1),
      switchMap((user) => {
        userLogged = user;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: ReviewData }>(
          'https://movie-app-flicks-default-rtdb.europe-west1.firebasedatabase.app/reviews.json?auth=' +
            token
        );
      }),
      take(1),
      switchMap((reviewsData) => {
        const reviews: ReviewModel[] = [];
        for (const key in reviewsData) {
          if (
            reviewsData.hasOwnProperty(key) &&
            userLogged != null &&
            userLogged.email === reviewsData[key].user.email
          ) {
            reviews.push({
              id: key,
              text: reviewsData[key].text,
              movie: reviewsData[key].movie,
              user: reviewsData[key].user,
            });
          }
        }
        this.myReviews.next(reviews);
        return reviews;
      })
    );
  }

  deleteReview(deleteReview: ReviewModel) {
    var index: number;
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete<{ name: string }>(
          'https://movie-app-flicks-default-rtdb.europe-west1.firebasedatabase.app/reviews/' +
            deleteReview.id +
            '.json?auth=' +
            token
        );
      }),
      switchMap((reviewData) => {
        return this.myReviews;
      }),
      take(1),
      tap((reviews) => {
        index = reviews.findIndex((review) => review.id == deleteReview.id);
        var updatedReviews = [...reviews];
        updatedReviews.splice(index, 1);
        this.myReviews.next(updatedReviews);
      })
    );
  }

  editReview(id: string | null, text: string, movie: any) {
    var index: number;
    let loggedUser: UserModel | null;
    let newReview: ReviewModel;
    return this.authService.user.pipe(
      take(1),
      switchMap((user) => {
        loggedUser = user;
        newReview = new ReviewModel(id, text, movie, user);
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        return this.http.put<{ name: string }>(
          'https://movie-app-flicks-default-rtdb.europe-west1.firebasedatabase.app/reviews/' +
            id +
            '/.json?auth=' +
            token,
          newReview
        );
      }),
      take(1),
      switchMap((resData) => {
        return this.myReviews;
      }),
      take(1),
      tap((reviews) => {
        index = reviews.findIndex((review) => review.id == newReview.id);
        var updatedReview = [...reviews];
        const review = updatedReview[index];
        updatedReview[index] = {
          id: id,
          text: text,
          movie: movie,
          user: loggedUser,
        };
        this.myReviews.next(updatedReview);
      })
    );
  }
}
