import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonConstants } from '../../../constants/common-constants';
import IPaginationEvent from '../../../interfaces/sfc-pagination/IPaginationEvent';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private pageSize: number = CommonConstants.PAGINATION_DEFAULTS.SIZE;
  private pageSubject = new Subject<number>();
  private pageSelectedAction$ = this.pageSubject.asObservable();

  public total$: Observable<number>;
  public totalPages$: Observable<number>;
  public pageSource$: Observable<IPaginationEvent>;

  public initPagination(data$: Observable<any[]>,
    page: number = CommonConstants.PAGINATION_DEFAULTS.PAGE,
    pageSize: number = CommonConstants.PAGINATION_DEFAULTS.SIZE) {
    this.pageSize = pageSize;
    this.initObservables(data$, page)
  }

  public goToPage(page: number) {
    this.pageSubject.next(page);
  }

  private initObservables(data$: Observable<any[]>, page: number) {
    this.total$ = data$
      .pipe(
        map((p: any[]) => p.length)
      );

    this.totalPages$ = this.total$
      .pipe(
        map((total: number) => {
          return Math.ceil(total / this.pageSize);
        })
      );

    this.pageSource$ = combineLatest([
      this.totalPages$,
      this.pageSelectedAction$.pipe(startWith(page))
    ])
      .pipe(
        map(([total, page]) => {
          return {
            page: page > total ? CommonConstants.PAGINATION_DEFAULTS.PAGE : page,
            nextPage: Math.min(page + 1, total),
            prevPage: Math.max(1, page - 1),
            totalPages: total
          };
        })
      );
  }
}
