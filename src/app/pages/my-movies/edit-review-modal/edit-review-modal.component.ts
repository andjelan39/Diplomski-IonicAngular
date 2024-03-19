import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReviewModel } from 'src/app/review.model';
import { MovieService } from 'src/app/services/movie.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-review-modal',
  templateUrl: './edit-review-modal.component.html',
  styleUrls: ['./edit-review-modal.component.scss'],
})
export class EditReviewModalComponent  implements OnInit {

  review!: ReviewModel;
  defaultText!: string;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }
  @ViewChild('f', { static: true }) form!: NgForm;

  ngOnInit() {
    this.review = this.movieService.getReviewEdit();
    this.defaultText = this.review.text;
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onEditReview() {
    if (!this.form.valid) {
      return;
    }
    this.modalCtrl.dismiss(
      {
        reviewData: {
          id: this.review.id,
          text: this.form.value['revtext'],
          movie: this.review.movie,
          user: this.review.user,
        },
      },
      'confirm'
    );
  }

}
