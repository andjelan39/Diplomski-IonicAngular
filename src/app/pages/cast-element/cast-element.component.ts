import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cast-element',
  templateUrl: './cast-element.component.html',
  styleUrls: ['./cast-element.component.scss'],
})
export class CastElementComponent  implements OnInit {
  @Input() actor: any;
  imageBaseUrl = environment.images;

  constructor() { }

  ngOnInit() {}

}
