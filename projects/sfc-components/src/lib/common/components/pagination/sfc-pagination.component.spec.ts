import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { CommonConstants, StyleClass } from '../../constants/common-constants';
import { CollectionUtils } from '../../utils/collection-utils';
import { SfcPaginationComponent } from './sfc-pagination.component';

describe('Component: SfcPaginationComponent', () => {
  let component: SfcPaginationComponent;
  let fixture: ComponentFixture<SfcPaginationComponent>;

  describe('Not initialized data source', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [SfcPaginationComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents().then(() => {
        fixture = TestBed.createComponent(SfcPaginationComponent);
      });
    }));

    it("Expect throwing error - not initialized page source", async(() => {
      expect(() => fixture.detectChanges()).toThrowError('Page source for pagination component not initialized.');
    }));
  });

  describe('Initialized data source', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [SfcComponentsModule]
      }).compileComponents().then(() => {
        fixture = TestBed.createComponent(SfcPaginationComponent);
        component = fixture.componentInstance;
      });
    }));

    describe('General', () => {
      it('Should create component', () => {
        expect(component).toBeTruthy();
      });

      it('Main elements', () => {
        expect(fixture.nativeElement.querySelector('div.pagination-container')).toBeDefined();
      });

      it('There is no page', () => {
        component.paginationService.initPagination(of([]));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('ul.pagination')).toBeNull();
      });

      it('Pages exist', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('ul.pagination')).toBeDefined();
      });
    });

    describe('Previous button', () => {
      it('Should be hidden', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]), 1);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('ul.pagination li')[0].style.visibility).toEqual(StyleClass.Hidden);
      });

      it('Should be visible', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]), 2);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('ul.pagination li')[0].style.visibility).toEqual(StyleClass.Visible);
      });

      it('Should have such icon', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]), 2);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('ul.pagination li button .fa.fa-chevron-left')).toBeDefined();
      });

      it('On click event', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]), 2);
        fixture.detectChanges();

        assertActivePage(1);

        const prevBtnEl = fixture.nativeElement.querySelectorAll('ul.pagination li')[0];

        expect(prevBtnEl.style.visibility).toEqual(StyleClass.Visible);

        prevBtnEl.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(prevBtnEl.style.visibility).toEqual(StyleClass.Hidden);
        assertActivePage(0);
      });
    });

    describe('First page', () => {
      it('Should not exist (by default)', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]));
        fixture.detectChanges();

        const firstPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.first-page');

        expect(firstPageEls.length).toEqual(0);
      });

      it('Should not exist(full count)', () => {
        component.showFirstLast = true;
        component.fullCount = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]));
        fixture.detectChanges();

        const firstPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.first-page');

        expect(firstPageEls.length).toEqual(0);
      });

      it('Should not exist(already first page)', () => {
        component.showFirstLast = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]), 1);
        fixture.detectChanges();

        const firstPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.first-page');

        expect(firstPageEls.length).toEqual(0);
      });

      it('Should not exist(found in range)', () => {
        component.showFirstLast = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]), 2, 2);
        fixture.detectChanges();

        const firstPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.first-page');

        expect(firstPageEls.length).toEqual(0);
      });

      it('Should exist', () => {
        component.showFirstLast = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9]), 4, 2);
        fixture.detectChanges();

        const firstPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.first-page');

        expect(firstPageEls.length).toEqual(2);
      });

      it('Elements content', () => {
        component.showFirstLast = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9]), 4, 2);
        fixture.detectChanges();

        const firstPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.first-page');

        expect(firstPageEls[0].querySelector('button').innerText).toEqual(CommonConstants.PAGINATION_DEFAULTS.PAGE.toString());
        expect(firstPageEls[1].querySelector('span').innerText).toEqual('...');
      });

      it('On click event', () => {
        component.showFirstLast = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9]), 4, 2);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('ul.pagination li.first-page').length).toEqual(2);

        const firstPageEl = fixture.nativeElement.querySelectorAll('ul.pagination li.first-page')[0];
        firstPageEl.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('ul.pagination li.first-page').length).toEqual(0);
        assertActivePage(0);
      });
    });

    describe('Pages', () => {
      it('Count by default', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('ul.pagination li.page').length).toEqual(2);
      });

      it('Count when defined input count(more than total pages)', () => {
        component.count = 14;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9]), 1, 2);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('ul.pagination li.page').length).toEqual(5);
      });

      it('Count when defined input count (less than total pages)', () => {
        component.count = 4;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), 1, 2);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('ul.pagination li.page').length).toEqual(4);
      });

      it('Content (show all)', () => {
        component.fullCount = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), 1, 2);
        fixture.detectChanges();

        const pageBtns = fixture.nativeElement.querySelectorAll('ul.pagination li.page button');
        pageBtns.forEach((pageBtn, index) => {
          expect(pageBtn.innerText).toEqual(`${index + 1}`);
        });
      });

      it('Content (show only part of range)', () => {
        component.count = 2;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), 3, 2);
        fixture.detectChanges();

        const pageBtns = fixture.nativeElement.querySelectorAll('ul.pagination li.page button');

        expect(pageBtns.length).toEqual(2);
        expect(pageBtns[0].innerText).toEqual('2');
        expect(pageBtns[1].innerText).toEqual('3');
      });

      it('Active (by default)', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
        fixture.detectChanges();

        assertActivePage(0);
      });

      it('Active (when defined page initialy)', () => {
        component.fullCount = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), 4, 2);
        fixture.detectChanges();

        assertActivePage(3);
      });

      it('Active (by clicking on page)', () => {
        component.fullCount = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), 1, 2);
        fixture.detectChanges();

        const fivePageEl = fixture.nativeElement.querySelectorAll('ul.pagination li.page')[4];
        fivePageEl.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        assertActivePage(4);
      });
    });

    describe('Last page', () => {
      it('Should not exist (by default)', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]));
        fixture.detectChanges();

        const lastPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.last-page');

        expect(lastPageEls.length).toEqual(0);
      });

      it('Should not exist(full count)', () => {
        component.showFirstLast = true;
        component.fullCount = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]));
        fixture.detectChanges();

        const lastPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.last-page');

        expect(lastPageEls.length).toEqual(0);
      });

      it('Should not exist(already last page)', () => {
        component.showFirstLast = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]), 2);
        fixture.detectChanges();

        const lastPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.last-page');

        expect(lastPageEls.length).toEqual(0);
      });

      it('Should not exist(found in range)', () => {
        component.showFirstLast = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]), 2, 2);
        fixture.detectChanges();

        const lastPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.last-page');

        expect(lastPageEls.length).toEqual(0);
      });

      it('Should exist', () => {
        component.showFirstLast = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9]), 1, 2);
        fixture.detectChanges();

        const lastPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.last-page');

        expect(lastPageEls.length).toEqual(2);
      });

      it('Elements content', () => {
        component.showFirstLast = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9]), 1, 2);
        fixture.detectChanges();

        const lastPageEls = fixture.nativeElement.querySelectorAll('ul.pagination li.last-page');

        expect(lastPageEls[0].querySelector('span').innerText).toEqual('...');
        expect(lastPageEls[1].querySelector('button').innerText).toEqual('5');
      });

      it('On click event', () => {
        component.showFirstLast = true;
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6, 7, 8, 9]), 2, 2);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('ul.pagination li.last-page').length).toEqual(2);

        const lastPageEl = fixture.nativeElement.querySelectorAll('ul.pagination li.last-page')[1];
        lastPageEl.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('ul.pagination li.last-page').length).toEqual(0);
        assertActivePage(2);
      });
    });

    describe('Next button', () => {
      it('Should be hidden', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]), 2);
        fixture.detectChanges();

        expect(CollectionUtils.lastItem<any>(fixture.nativeElement.querySelectorAll('ul.pagination li')).style.visibility).toEqual(StyleClass.Hidden);
      });

      it('Should be visible', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]));
        fixture.detectChanges();

        expect(CollectionUtils.lastItem<any>(fixture.nativeElement.querySelectorAll('ul.pagination li')).style.visibility).toEqual(StyleClass.Visible);
      });

      it('Should have such icon', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('ul.pagination li button .fa.fa-chevron-right')).toBeDefined();
      });

      it('On click event', () => {
        component.paginationService.initPagination(of([1, 2, 3, 4, 5, 6]));
        fixture.detectChanges();

        assertActivePage(0);

        const nextBtnEl = CollectionUtils.lastItem<any>(fixture.nativeElement.querySelectorAll('ul.pagination li'));

        expect(nextBtnEl.style.visibility).toEqual(StyleClass.Visible);

        nextBtnEl.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(nextBtnEl.style.visibility).toEqual(StyleClass.Hidden);
        assertActivePage(1);
      });
    });

    function assertActivePage(activeIndex: number) {
      const pageBtns = fixture.nativeElement.querySelectorAll('ul.pagination li.page button');

      pageBtns.forEach((pageBtn, index) => {
        if (index == activeIndex)
          expect(pageBtn.className).toContain(StyleClass.Active);
        else
          expect(pageBtn.className).not.toContain(StyleClass.Active);
      });
    }
  });
});