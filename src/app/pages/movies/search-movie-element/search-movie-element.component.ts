import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-movie-element',
  templateUrl: './search-movie-element.component.html',
  styleUrls: ['./search-movie-element.component.scss'],
})
export class SearchMovieElementComponent  implements OnInit {
  @Input() movie: any;
  imageBaseUrl = environment.images;

  constructor() { }

  ngOnInit() {}

}
