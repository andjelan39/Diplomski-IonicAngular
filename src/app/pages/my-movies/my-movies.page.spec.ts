import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyMoviesPage } from './my-movies.page';

describe('MyMoviesPage', () => {
  let component: MyMoviesPage;
  let fixture: ComponentFixture<MyMoviesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyMoviesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
