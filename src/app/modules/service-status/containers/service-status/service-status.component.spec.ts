import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ServiceStatusComponent } from './service-status.component';
import { ServiceStatusActions } from '../store/actions/service-status.actions';
import { selectServiceStatusState } from '../store/selectors/service-status.selectors';
import { By } from '@angular/platform-browser';

describe('ServiceStatusComponent', () => {
  let component: ServiceStatusComponent;
  let fixture: ComponentFixture<ServiceStatusComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceStatusComponent],
      providers: [provideMockStore()],
    });

    store = TestBed.inject(MockStore);
    jest.spyOn(store, 'dispatch').mockImplementation();

    fixture = TestBed.createComponent(ServiceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should call 'dispatch(ServiceStatusActions.fetchStatus)'`, () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      ServiceStatusActions.fetchStatus()
    );
  });

  describe('when loading', () => {
    beforeEach(() => {
      store.overrideSelector(selectServiceStatusState, { isLoading: true });
      store.refreshState();

      fixture.detectChanges();
    });

    it('should display the spinner', () => {
      const spinnerElement = fixture.debugElement.query(
        By.css('[data-id="spinner"]')
      );
      expect(spinnerElement).not.toBeNull();
    });
  });

  describe('when result is available', () => {
    beforeEach(() => {
      store.overrideSelector(selectServiceStatusState, { services: {} });
      store.refreshState();

      fixture.detectChanges();
    });

    it('should display the result table', () => {
      const spinnerElement = fixture.debugElement.query(
        By.css('[data-id="result"]')
      );
      expect(spinnerElement).not.toBeNull();
    });
  });
});
