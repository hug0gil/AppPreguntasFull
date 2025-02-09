import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCategoriesComponent } from './app-categories.component';

describe('AppCategoriesComponent', () => {
  let component: AppCategoriesComponent;
  let fixture: ComponentFixture<AppCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
