import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAskComponent } from './app-ask.component';

describe('AppAskComponent', () => {
  let component: AppAskComponent;
  let fixture: ComponentFixture<AppAskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
