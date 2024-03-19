import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ReviewModel } from 'src/app/review.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { EditReviewModalComponent } from '../edit-review-modal/edit-review-modal.component';

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

  deleteReview(review: ReviewModel) {
    this.alertCtrl
      .create({
        header: 'Delete review',
        message: 'Are you sure you want to delete this review?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Cancel delete');
            },
          },
          {
            text: 'Delete',
            handler: () => {
              this.moviesService.deleteReview(review).subscribe((res) => {});
              console.log('Review deleted successfully');
            },
          },
        ],
      })
      .then((alert: HTMLIonAlertElement) => {
        alert.present();
      });
  }

  openEdit(review: ReviewModel) {
    this.moviesService.setReviewEdit(review);
    this.modalCtrl
      .create({
        component: EditReviewModalComponent,
      })
      .then((modal: HTMLIonModalElement) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.moviesService
            .editReview(
              resultData.data.reviewData.id,
              resultData.data.reviewData.text,
              resultData.data.reviewData.movie
            )
            .subscribe((res) => {
              //console.log(res);
            });
        } else {
          console.log('canceled');
        }
      });
  }
}
