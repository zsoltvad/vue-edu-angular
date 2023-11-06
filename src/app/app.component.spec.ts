import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { APP_TITLE } from './constants/title';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it(`should have the title: ${APP_TITLE}`, () => {
    expect(fixture.nativeElement.textContent).toContain(APP_TITLE);
  });
});
