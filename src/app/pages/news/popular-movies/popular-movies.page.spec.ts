import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularMoviesPage } from './popular-movies.page';

describe('PopularMoviesPage', () => {
  let component: PopularMoviesPage;
  let fixture: ComponentFixture<PopularMoviesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PopularMoviesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
