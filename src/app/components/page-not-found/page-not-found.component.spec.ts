import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
    });

    fixture = TestBed.createComponent(PageNotFoundComponent);
    fixture.detectChanges();
  });

  it(`should display a '404' error code`, () => {
    const errorCodeElement = fixture.debugElement.query(
      By.css('[data-id="error-code"]')
    ).nativeElement;
    expect(errorCodeElement.textContent).toEqual('404');
  });
});
