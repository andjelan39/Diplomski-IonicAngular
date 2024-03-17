import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-element',
  templateUrl: './movie-element.component.html',
  styleUrls: ['./movie-element.component.scss'],
})
export class MovieElementComponent  implements OnInit {
  @Input() movie: any;
  imageBaseUrl = environment.images;

  constructor() { }

  ngOnInit() {}

}
