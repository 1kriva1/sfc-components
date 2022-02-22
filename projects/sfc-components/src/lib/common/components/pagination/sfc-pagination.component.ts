import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonConstants } from '../../constants/common-constants';
import IPaginationEvent from '../../interfaces/sfc-pagination/IPaginationEvent';
import { CommonUtils } from '../../utils/common-utils';
import { PaginationService } from './service/pagination.service';

@Component({
  selector: 'sfc-pagination',
  templateUrl: './sfc-pagination.component.html',
  styleUrls: ['./sfc-pagination.component.css', './sfc-pagination-dark-theme.component.css']
})
export class SfcPaginationComponent implements OnInit {

  // max limit for pagination bts
  @Input()
  count: number = CommonConstants.PAGINATION_DEFAULTS.COUNT;

  /**
   * show first and last page's btn
   */
  @Input('show-first-last')
  showFirstLast: boolean = false;

  /**
   * show full range of data
   */
  @Input('full-count')
  fullCount: boolean = false;

  public vm$: Observable<any>;

  constructor(public paginationService: PaginationService) { }

  ngOnInit(): void {
    if (!CommonUtils.isDefined(this.paginationService.pageSource$))
      throw new Error('Page source for pagination component not initialized.');

    this.vm$ = this.paginationService.pageSource$.pipe(
      map((model) => {
        const range = this.initPaginationPages(model);
        return {
          range: range, // range of pagination data
          isAnyPages: model.totalPages > 0, // if exist range of pages
          showFirstPage: this.isShowFirstPage(range, model), // show first page of range
          showLastPage: this.isShowLastPage(range, model), // show last page of range
          showPrevPage: model.page != CommonConstants.PAGINATION_DEFAULTS.PAGE, // show previous btn
          showNextPage: model.totalPages > model.page, // show next btn
          page: model.page,
          prevPage: model.prevPage,
          nextPage: model.nextPage,
          totalPages: model.totalPages
        }
      })
    );
  }

  onPageClick(page: number) {
    this.paginationService.goToPage(page);
  }

  private get showFirstOrLastPage(): boolean {
    return this.showFirstLast
      && !this.fullCount;
  }

  private isShowFirstPage(range: number[], event: IPaginationEvent): boolean {
    return this.showFirstOrLastPage
      && event.page !== CommonConstants.PAGINATION_DEFAULTS.PAGE
      && range.indexOf(CommonConstants.PAGINATION_DEFAULTS.PAGE) == -1;
  }

  private isShowLastPage(range: number[], event: IPaginationEvent): boolean {
    return this.showFirstOrLastPage
      && event.totalPages !== event.page
      && range.indexOf(event.totalPages) == -1;
  }

  private initPaginationPages(event: IPaginationEvent): number[] {
    let start = 1,
      end = event.totalPages + 1;

    if (!this.fullCount) {
      const fullRange = this.range(1, event.totalPages + 1),
        pageIndex = fullRange.indexOf(event.page),
        pageCount = Math.min(event.totalPages, this.count);

      let rangeStart = 0, rangeEnd = 0;

      if (pageCount == CommonConstants.PAGINATION_DEFAULTS.PAGE) {
        rangeStart = rangeEnd = pageIndex;
      } else {
        let allowedCount = pageCount - 1,
          partValue = Math.ceil(allowedCount / 2),
          leftValue = pageIndex - partValue < 0 ? pageIndex : partValue,
          rightToExtend = allowedCount - leftValue,
          rightValue = rightToExtend < 0 ? 0 : rightToExtend;

        if (pageIndex + rightValue >= event.totalPages)
          leftValue += pageIndex + rightValue - event.totalPages + 1;

        rangeStart = pageIndex - leftValue;
        rangeEnd = pageIndex + rightValue;
      }

      start = rangeStart + 1;
      end = Math.min(event.totalPages + 1, rangeEnd + 2);
    }

    return this.range(start, end);
  }

  private range(start: number, stop: number, step: number = 1): number[] {
    if (!stop) { start = 0; stop = start; }
    return Array.from(new Array(Number((stop - start) / step)), (x, i) => start + i * step);
  }
}