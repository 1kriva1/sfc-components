import { TestBed } from '@angular/core/testing';
import { SortingService } from './sorting.service';
import ISortingEvent from '../../interfaces/sfc-sorting/ISortingEvent';
import { SortingDirection } from '../../constants/common-constants';

describe('Service: Sorting', () => {

  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(SortingService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Sorting observable should be created', () => {
    expect(service.sorting$).toBeDefined();
  });

  it('Should return event data', (done: DoneFn) => {
    service.sorting$.subscribe((event: ISortingEvent) => {
      expect(event).toBeDefined();
      done();
    });

    service.sort({ sortingId: 'test-id', direction: SortingDirection.Ascending });
  });

  it('Should return exact event data', (done: DoneFn) => {
    const eventData: ISortingEvent = { sortingId: 'test-id', direction: SortingDirection.Ascending };

    service.sorting$.subscribe((event: ISortingEvent) => {
      expect(event).toEqual(eventData);
      done();
    });

    service.sort(eventData);
  });

  it('Should return exact event data on each sort action', (done: DoneFn) => {
    const eventData: ISortingEvent = { sortingId: 'test-id', direction: SortingDirection.Ascending },
      eventDataUpdated = { sortingId: 'test-id-updated', direction: SortingDirection.Descending };

    let isFirstCalled: boolean = false;

    service.sorting$.subscribe((event: ISortingEvent) => {
      expect(event).toEqual(!isFirstCalled ? eventData : eventDataUpdated);
      isFirstCalled = true;

      done();
    });

    service.sort(eventData);

    service.sort(eventDataUpdated);
  });
});
