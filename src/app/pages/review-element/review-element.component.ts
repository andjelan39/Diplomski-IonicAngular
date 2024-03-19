import { Component, Input, OnInit } from '@angular/core';
import { ReviewModel } from 'src/app/review.model';

@Component({
  selector: 'app-review-element',
  templateUrl: './review-element.component.html',
  styleUrls: ['./review-element.component.scss'],
})
export class ReviewElementComponent implements OnInit {
  @Input() review!: ReviewModel;
  
  constructor() {}

  ngOnInit() {}
}
