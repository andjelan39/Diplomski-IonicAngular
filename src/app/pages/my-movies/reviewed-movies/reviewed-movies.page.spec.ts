import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewedMoviesPage } from './reviewed-movies.page';

describe('ReviewedMoviesPage', () => {
  let component: ReviewedMoviesPage;
  let fixture: ComponentFixture<ReviewedMoviesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReviewedMoviesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
