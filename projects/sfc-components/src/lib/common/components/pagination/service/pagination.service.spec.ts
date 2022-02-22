import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';
import IPaginationEvent from '../../../interfaces/sfc-pagination/IPaginationEvent';
import { PaginationService } from './pagination.service';

describe('Service: Pagination', () => {

  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(PaginationService);
  });

  it('PaginationService: should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Init (total): with default values', done => {
    let data$ = of([1, 2, 3]);

    service.initPagination(data$);

    service.total$.subscribe((total: number) => {
      expect(total).toBe(3);
      done();
    })
  });

  it('Init (total pages): with default values', done => {
    let data$ = of([1, 2, 3, 4, 5, 6]);

    service.initPagination(data$);

    service.totalPages$.subscribe((totalPages: number) => {
      expect(totalPages).toBe(2);
      done();
    })
  });

  it('Init (total pages): with defined values', done => {
    let data$ = of([1, 2, 3, 4, 5, 6]);

    service.initPagination(data$, 1, 2);

    service.totalPages$.subscribe((totalPages: number) => {
      expect(totalPages).toBe(3);
      done();
    })
  });

  it('Init (page source): with default values', done => {
    let data$ = of([1, 2, 3, 4, 5, 6]);

    service.initPagination(data$);

    service.pageSource$.subscribe((event: IPaginationEvent) => {
      expect(event.page).toBe(1);
      expect(event.nextPage).toBe(2);
      expect(event.prevPage).toBe(1);
      expect(event.totalPages).toBe(2);
      done();
    });
  });

  it('Init (page source): with defined values', done => {
    let data$ = of([1, 2, 3, 4, 5, 6]);

    service.initPagination(data$, 2, 2);

    service.pageSource$.subscribe((event: IPaginationEvent) => {
      expect(event.page).toBe(2);
      expect(event.nextPage).toBe(3);
      expect(event.prevPage).toBe(1);
      expect(event.totalPages).toBe(3);
      done();
    });
  });

  it('Go to page: execute', done => {
    let scheduler: TestScheduler = new TestScheduler((actual, expected) => {
      expect(actual[1].value).toEqual(expected.value);
    })

    let data$ = of([1, 2, 3, 4, 5, 6]);

    service.initPagination(data$, 2);

    scheduler.run((expected) => {
      expected.cold('pageValue').subscribe(() => {
        service.goToPage(1);
        done();
      });
      expected.expectObservable(service.pageSource$).toBe('pageValue', {
        pageValue: {
          page: 1,
          nextPage: 2,
          prevPage: 1,
          totalPages: 2
        }
      });
    });
  });
});