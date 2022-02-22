import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CommonConstants, PositionSideType, SortingDirection, TableDataType } from '../common/constants/common-constants';
import IDataModel from '../common/interfaces/sfc-table/IDataModel';
import { ResizeService } from '../common/services/resize.service';
import { WINDOW } from '../common/services/window-ref.service';
import { SfcComponentsModule } from '../sfc-components.module';
import { SfcTableComponent } from './sfc-table.component';

describe('Component: SfcTableComponent', () => {
  let component: SfcTableComponent;
  let fixture: ComponentFixture<SfcTableComponent>;
  let el: DebugElement;
  let windowMock: any = <any>{};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule],
      providers: [
        ResizeService,
        { provide: WINDOW, useFactory: (() => { return windowMock; }) }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SfcTableComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      windowMock.innerWidth = CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE;
      fixture.detectChanges();
    });
  }));

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Main elements', () => {
      expect(fixture.nativeElement.querySelector('div.table-container')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.columns-container')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.action-container')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.rows-container')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.pagination-container')).toBeDefined();
    });

    fit('Column delimeter by default', () => {
      expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeNull();
    });

    fit('Column delimeter when column delimeter is true', () => {
      component.columnDelimeter = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeDefined();
    });

    fit('Column delimeter when column delimeter is false', () => {
      component.columnDelimeter = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeNull();
    });
  });

  describe('Actions', () => {

    describe('Columns toggle', () => {
      fit('By default', () => {
        expect(fixture.nativeElement.querySelector('sfc-columns-toggle')).toBeDefined();
      });

      fit('When show columns is false', () => {
        component.showColumns = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-columns-toggle')).toBeNull();
      });

    });

    describe('Data toggle', () => {
      fit('By default', () => {
        expect(fixture.nativeElement.querySelector('sfc-toggle')).toBeDefined();
      });

      fit('When show data toggle is false', () => {
        component.showDataToggle = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-toggle')).toBeNull();
      });

      fit('Value by default', () => {
        const toggleEl = el.query(By.css('sfc-toggle'));

        expect(toggleEl.attributes['ng-reflect-value']).toEqual('false');
        expect(toggleEl.componentInstance.value).toBeFalsy();
      });

      fit('Value when data type is cards', () => {
        component.dataType = TableDataType.Cards;
        fixture.detectChanges();

        const toggleEl = el.query(By.css('sfc-toggle'));

        expect(toggleEl.attributes['ng-reflect-value']).toEqual('true');
        expect(toggleEl.componentInstance.value).toBeTruthy();
      });

      fit('Static config', () => {
        const toggleEl = el.query(By.css('sfc-toggle'));

        expect(toggleEl.componentInstance.config).toEqual(component.TYPE_TOGGLE_CONFIG);
      });

      fit('On-toggle event should change data type', () => {
        expect(component.dataType).toEqual(TableDataType.Rows);

        fixture.nativeElement.querySelector('sfc-toggle').dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(component.dataType).toEqual(TableDataType.Cards);
      });
    });
  });

  describe('Pagination', () => {
    fit('By default', () => {
      expect(fixture.nativeElement.querySelector('sfc-pagination')).toBeDefined();
    });

    fit('When pagination is disabled', () => {
      component.pagination.enabled = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-pagination')).toBeNull();
    });

    fit('Static attributes', () => {
      const paginationEl = el.query(By.css('sfc-pagination'));

      expect(paginationEl.attributes['ng-reflect-show-first-last']).toEqual('false');
      expect(paginationEl.attributes['ng-reflect-full-count']).toEqual('false');
      expect(paginationEl.componentInstance.showFirstLast).toBeFalsy();
      expect(paginationEl.componentInstance.fullCount).toBeFalsy();
    });
  });

  describe('Columns', () => {
    fit('Should show columns by default', () => {
      expect(fixture.nativeElement.querySelector('.columns > div.columns')).toBeDefined();
    });

    fit('Should hide columns when show column input is false', () => {
      component.showColumns = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.columns > div.columns')).toBeNull();
    });

    fit('Should show columns when windows size is more than constant value', () => {
      windowMock.innerWidth = CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE + 1;
      fixture.detectChanges();

      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.columns > div.columns')).toBeDefined();
    });

    fit('Should show columns when windows size is equal to constant value', () => {
      windowMock.innerWidth = CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE;
      fixture.detectChanges();

      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.columns > div.columns')).toBeDefined();
    });

    fit('Should hide columns when windows size is less than constant value', () => {
      windowMock.innerWidth = CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE - 1;
      fixture.detectChanges();

      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.columns > div.columns')).toBeNull();
    });

    fit('Column position by default', () => {
      component.columns = [{ columnName: '', fieldName: '' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.columns > div.column').style.justifyContent).toEqual(PositionSideType.Center);
    });

    fit('Column position when defined value', () => {
      component.columns = [{ columnName: '', fieldName: '' }];
      component.columnPosition = PositionSideType.Start;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.columns > div.column').style.justifyContent).toEqual(PositionSideType.Start);
    });

    fit('Column width value for desktop', () => {
      component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
      fixture.detectChanges();

      windowMock.innerWidth = CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE + 1;
      fixture.detectChanges();

      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.columns > div.column').style.width).toEqual('calc(50%)');
    });

    fit('Column width value for tablet', () => {
      component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.columns > div.column').style.width).toEqual('calc(100%)');
    });

    fit('Column width value for mobile', () => {
      component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
      fixture.detectChanges();

      windowMock.innerWidth = CommonConstants.MEDIA_LIMITS.MOBILE_MAX_SIZE;
      fixture.detectChanges();

      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();

      // need toggle columns, because for mobile they will be hiden
      fixture.nativeElement.querySelector('sfc-columns-toggle').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.columns > div.column').style.width).toEqual('calc(100%)');
    });

    fit('Columns count', () => {
      component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('.columns > div.column').length).toEqual(component.columns.length);
    });

    fit('Columns count changing', () => {
      component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('.columns > div.column').length).toEqual(component.columns.length);

      component.columns.push({ columnName: '', fieldName: '' });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('.columns > div.column').length).toEqual(component.columns.length);

      component.columns.shift();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('.columns > div.column').length).toEqual(component.columns.length);
    });

    describe('Selectable column', () => {
      fit('Should not exist if table not selectable (by default)', () => {
        component.columns = [{ columnName: '', fieldName: '', }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-selectable-table-column')).toBeNull();
      });

      fit('Should not exist if table not selectable', () => {
        component.columns = [{ columnName: '', fieldName: '', }];
        component.selectable = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-selectable-table-column')).toBeNull();
      });

      fit('Should exist if table is selectable', () => {
        component.columns = [{ columnName: '', fieldName: '', }];
        component.selectable = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-selectable-table-column')).toBeDefined();
      });

      fit('Should not be selected if all rows not checked', () => {
        component.columns = [{ columnName: '', fieldName: '', }];
        component.selectable = true;
        component.data = [{ data: {}, selected: false }, { data: {}, selected: false }];
        fixture.detectChanges();

        const selectAllColumnEl = el.query(By.css('sfc-selectable-table-column'));

        expect(selectAllColumnEl.attributes['ng-reflect-selected']).toEqual('false');
        expect(selectAllColumnEl.componentInstance.selected).toBeFalsy();
      });

      fit('Should not be selected if one of the rows not selected', () => {
        component.columns = [{ columnName: '', fieldName: '', }];
        component.data = [{ data: {}, selected: true }, { data: {}, selected: false }];
        component.selectable = true;
        fixture.detectChanges();

        const selectAllColumnEl = el.query(By.css('sfc-selectable-table-column'));

        expect(selectAllColumnEl.attributes['ng-reflect-selected']).toEqual('false');
        expect(selectAllColumnEl.componentInstance.selected).toBeFalsy();
      });

      fit('Should be selected if all rows selected', () => {
        component.columns = [{ columnName: '', fieldName: '', }];
        component.data = [{ data: {}, selected: true }, { data: {}, selected: true }];
        component.selectable = true;
        fixture.detectChanges();

        const selectAllColumnEl = el.query(By.css('sfc-selectable-table-column'));

        expect(selectAllColumnEl.attributes['ng-reflect-selected']).toEqual('true');
        expect(selectAllColumnEl.componentInstance.selected).toBeTruthy();
      });
    });

    describe('Sequence column', () => {
      fit('Should not exist be default', () => {
        component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('sfc-sorting').length).toEqual(component.columns.length);
      });

      fit('Should exist if show sequence column is TRUE', () => {
        component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
        component.showSequence = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('sfc-sorting').length).toEqual(component.columns.length + 1);
      });
    });

    describe('Column sorting', () => {
      fit('Sorting component must be the same as columns', () => {
        component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('sfc-sorting').length).toEqual(component.columns.length);
      });

      fit('Sorting config when sorting config not present for column', () => {
        component.columns = [{ columnName: '', fieldName: '' }];
        fixture.detectChanges();

        const sortingEl = el.query(By.css('sfc-sorting'));

        expect(sortingEl.componentInstance.config).toEqual({ active: false, enabled: false, direction: SortingDirection.Ascending });
      });

      fit('Sorting config when sorting config present for column', () => {
        const sortingAssertValue = { active: true, enabled: true, direction: SortingDirection.Descending };
        component.columns = [{ columnName: '', fieldName: '', sorting: sortingAssertValue }];
        fixture.detectChanges();

        const sortingEl = el.query(By.css('sfc-sorting'));

        expect(sortingEl.componentInstance.config).toEqual(sortingAssertValue);
      });

      fit('Sorting id should be equal to column fieldName', () => {
        component.columns = [{ columnName: '', fieldName: 'test-id' }];
        fixture.detectChanges();

        const sortingEl = el.query(By.css('sfc-sorting'));

        expect(sortingEl.attributes['ng-reflect-id']).toEqual('test-id');
        expect(sortingEl.componentInstance.id).toEqual('test-id');
      });
    });

    describe('Column content', () => {

      fit("Should created default column by default configuration", async(() => {
        component.columns = [{ columnName: '', fieldName: '' }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-default-table-column')).toBeDefined();
      }));

      fit("Should not created default column when default-column-template is FALSE", async(() => {
        component.columns = [{ columnName: '', fieldName: '' }];
        component.defaultColumnTemplate = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-default-table-column')).toBeNull();
      }));

      fit("Default column config value", async(() => {
        component.columns = [{ columnName: '', fieldName: '' }];
        fixture.detectChanges();

        const defaultColumnEl = el.query(By.css('sfc-default-table-column'));

        expect(defaultColumnEl.componentInstance.column).toEqual({ columnName: '', fieldName: '' });
      }));
    });

    describe('Rows content', () => {

      fit("Should created default row by default configuration", async(() => {
        component.columns = [{ columnName: '', fieldName: '' }];
        component.data = [{ data: {} }, { data: {} }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);
      }));

      fit("Should not created default row when default-row-template is FALSE", async(() => {
        component.columns = [{ columnName: '', fieldName: '' }];
        component.data = [{ data: {} }, { data: {} }];
        component.defaultRowTemplate = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(0);
      }));

      fit("Default rows attributes", async(() => {
        component.columns = [{ columnName: '', fieldName: '' }];
        component.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
        fixture.detectChanges();

        const deafultRowEls = el.queryAll(By.css('sfc-default-table-row'));

        deafultRowEls.forEach((row, index) => {
          expect(row.attributes['ng-reflect-column-position']).toEqual(component.columnPosition);
          expect(row.attributes['ng-reflect-column-width']).toEqual('1');
          expect(row.attributes['ng-reflect-select-on-click']).toEqual('false');
          expect(row.componentInstance.columns).toEqual(component.columns);
          expect(row.componentInstance.data).toEqual({ index: index, model: { data: { field: index == 0 ? 1 : 2 } } });
        });
      }));
    });

    describe('Cards content', () => {

      fit("Should created default card by default configuration", async(() => {
        component.columns = [{ columnName: '', fieldName: '' }];
        component.data = [{ data: {} }, { data: {} }];
        component.dataType = TableDataType.Cards;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('sfc-default-table-card').length).toEqual(2);
      }));

      fit("Should not created default card when default-card-template is FALSE", async(() => {
        component.columns = [{ columnName: '', fieldName: '' }];
        component.data = [{ data: {} }, { data: {} }];
        component.dataType = TableDataType.Cards;
        component.defaultCardTemplate = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('sfc-default-table-card').length).toEqual(0);
      }));

      fit("Default rows attributes", async(() => {
        component.columns = [{ columnName: '', fieldName: '' }];
        component.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
        component.selectOnClick = true;
        component.dataType = TableDataType.Cards;
        fixture.detectChanges();

        const deafultCardEls = el.queryAll(By.css('sfc-default-table-card'));

        deafultCardEls.forEach((card, index) => {
          expect(card.attributes['ng-reflect-select-on-click']).toEqual('true');
          expect(card.componentInstance.columns).toEqual(component.columns);
          expect(card.componentInstance.data).toEqual({ index: index, model: { data: { field: index == 0 ? 1 : 2 } } });
        });
      }));
    });
  });

  describe('Data', () => {
    fit("Sync data count", async(() => {
      component.data = [{ data: {} }, { data: {} }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);
    }));

    fit("Sync data changed", async(() => {
      component.data = [{ data: {} }, { data: {} }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);

      component.data.push({ data: {} });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(3);

      component.data.shift();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);
    }));

    fit("Async data count", async(() => {
      const dataSubject = new BehaviorSubject<any>([{ data: {} }, { data: {} }]);
      component.columns = [{ columnName: '', fieldName: 'field' }];
      component.data$ = dataSubject.asObservable();
      fixture.detectChanges();

      component.ngOnInit();
      fixture.detectChanges();

      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);
    }));

    fit("Async data changed", async(() => {
      const dataSubject = new BehaviorSubject<IDataModel[]>([{ data: {} }, { data: {} }]);
      component.columns = [{ columnName: '', fieldName: 'field' }];
      component.data$ = dataSubject.asObservable();
      fixture.detectChanges();

      component.ngOnInit();
      fixture.detectChanges();

      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);

      dataSubject.next([{ data: {} }]);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(1);

      dataSubject.next([{ data: {} }, { data: {} }, { data: {} }]);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(3);
    }));

    fit("Data should not be sorted", async(() => {
      component.columns = [{ columnName: '', fieldName: 'field' }];
      component.data = [{ data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } }];
      fixture.detectChanges();

      fixture.nativeElement.querySelector('sfc-sorting').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      const deafultRowsEls = el.queryAll(By.css('sfc-default-table-row'));

      deafultRowsEls.forEach((row, index) => {
        if (index == 0)
          expect(row.queryAll(By.css('.column-data span'))[1].nativeElement.innerText).toEqual('2');
        else if (index == 1)
          expect(row.queryAll(By.css('.column-data span'))[1].nativeElement.innerText).toEqual('1');
        else {
          expect(row.queryAll(By.css('.column-data span'))[1].nativeElement.innerText).toEqual('3');
        }
      });
    }));

    fit("Data should be sorted", async(() => {
      component.columns = [{ columnName: '', fieldName: 'field', sorting: { enabled: true, active: true } }];
      component.data = [{ data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } }];
      fixture.detectChanges();

      component.ngOnInit();
      fixture.detectChanges();

      fixture.nativeElement.querySelector('sfc-sorting').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      let deafultRowsEls = el.queryAll(By.css('sfc-default-table-row'));

      deafultRowsEls.forEach((row, index) => {
        if (index == 0)
          expect(row.queryAll(By.css('.column-data span'))[1].nativeElement.innerText).toEqual('1');
        else if (index == 1)
          expect(row.queryAll(By.css('.column-data span'))[1].nativeElement.innerText).toEqual('2');
        else {
          expect(row.queryAll(By.css('.column-data span'))[1].nativeElement.innerText).toEqual('3');
        }
      });

      fixture.nativeElement.querySelector('sfc-sorting').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      deafultRowsEls = el.queryAll(By.css('sfc-default-table-row'));

      deafultRowsEls.forEach((row, index) => {
        if (index == 0)
          expect(row.queryAll(By.css('.column-data span'))[1].nativeElement.innerText).toEqual('3');
        else if (index == 1)
          expect(row.queryAll(By.css('.column-data span'))[1].nativeElement.innerText).toEqual('2');
        else {
          expect(row.queryAll(By.css('.column-data span'))[1].nativeElement.innerText).toEqual('1');
        }
      });
    }));

    fit("Data pagination by default", async(() => {
      component.columns = [{ columnName: '', fieldName: 'field' }];
      component.data = [{ data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } },
      { data: { field: 3 } }, { data: { field: 3 } }, { data: { field: 3 } }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(5);
    }));

    fit("Data pagination config defined", async(() => {
      component.columns = [{ columnName: '', fieldName: 'field' }];
      component.data = [{ data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } },
      { data: { field: 3 } }, { data: { field: 3 } }];
      component.pagination = { enabled: true, page: 3, pageSize: 2 };
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);

      fixture.nativeElement.querySelectorAll('sfc-pagination li.page')[2].dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(1);
    }));

    fit('Data sequence', () => {
      component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
      component.data = [{ data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } },
      { data: { field: 3 } }, { data: { field: 3 } }];
      component.showSequence = true;
      fixture.detectChanges();

      let deafultRowsEls = el.queryAll(By.css('sfc-default-table-row'));

      deafultRowsEls.forEach((row, index) => {
        expect(row.queryAll(By.css('.column-sequence span'))[1].nativeElement.innerText).toEqual(`${index + 1}`);
      });
    });

    fit('Data sequence with pagination', () => {
      component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
      component.data = [{ data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } },
      { data: { field: 3 } }, { data: { field: 3 } }];
      component.showSequence = true;
      component.pagination = { enabled: true, page: 1, pageSize: 2 };
      component.ngOnInit();
      fixture.detectChanges();

      fixture.nativeElement.querySelectorAll('sfc-pagination li.page')[1].dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      let deafultRowsEls = el.queryAll(By.css('sfc-default-table-row'));

      deafultRowsEls.forEach((row, index) => {
        expect(row.queryAll(By.css('.column-sequence span'))[1].nativeElement.innerText).toEqual(`${index == 0 ? 3 : 4}`);
      });
    });

    fit('Data with selectable', () => {
      component.columns = [{ columnName: '', fieldName: '', }];
      component.data = [{ data: {}, selected: true }, { data: {}, selected: true }];
      component.selectable = true;
      fixture.detectChanges();

      let deafultRowsEls = el.queryAll(By.css('sfc-default-table-row'));

      deafultRowsEls.forEach(row => {
        expect(row.query(By.css('sfc-checkmark .checkmark-container.checked'))).toBeDefined();
      });
    });

    fit('Data change selected rows', () => {
      component.columns = [{ columnName: '', fieldName: '', }];
      component.data = [{ data: {}, selected: true }, { data: {}, selected: true }];
      component.selectable = true;
      fixture.detectChanges();

      fixture.nativeElement.querySelectorAll('.column-checkmark')[0].dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      let deafultRowsEls = el.queryAll(By.css('sfc-default-table-row'));

      deafultRowsEls.forEach((row, index) => {
        if (index == 0)
          expect(row.query(By.css('sfc-checkmark .checkmark-container.checked'))).toBeNull();
        else
          expect(row.query(By.css('sfc-checkmark .checkmark-container.checked'))).toBeDefined();
      });
    });

  });
});

@Component({
  template: `<ng-template #columnRef let-column>
                <h1 class="column-ref">{{column.columnName}}</h1>
            </ng-template>  
            
            <ng-template #rowRef let-data>
              <div class="row-ref">
                <h1 class="data">{{data.model.model.data.field}}</h1>
                <span class="column-width">{{data.columnWidth}}</span>
                <span class="column-position">{{data.columnPosition}}</span>
              </div>
            </ng-template>  
            
            <ng-template #cardRef let-data>
              <div class="card-ref">
                <h1 class="data">{{data.model.model.data.field}}</h1>
              </div>
            </ng-template>

           <sfc-table>
            <div *ngIf="showContent">
             <ng-template template="column" let-column>
              <h2 class="column-content">{{column.columnName}}</h2>
             </ng-template>
            </div> 

            <div *ngIf="showContent">              
             <ng-template template="row" let-data>
              <div class="row-content">
                <h2 class="data">{{data.model.model.data.field}}</h2>
                <span class="column-width">{{data.columnWidth}}</span>
                <span class="column-position">{{data.columnPosition}}</span>
              </div>
             </ng-template>
            </div>

            <div *ngIf="showContent">
             <ng-template template="card" let-data>
              <div class="card-content">
                <h2 class="data">{{data.model.model.data.field}}</h2>
              </div>
             </ng-template>
            </div>
           </sfc-table>`
})
class TestSfcTableComponent {

  @ViewChild(SfcTableComponent, { static: false })
  table: SfcTableComponent;

  @ViewChild('columnRef', { static: false })
  columnTemplateRef: TemplateRef<any>;

  @ViewChild('rowRef', { static: false })
  rowTemplateRef: TemplateRef<any>;

  @ViewChild('cardRef', { static: false })
  cardTemplateRef: TemplateRef<any>;

  showContent: boolean = false;
}

describe('Component: SfcTableComponent (templates)', () => {
  let component: TestSfcTableComponent;
  let fixture: ComponentFixture<TestSfcTableComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule],
      declarations: [TestSfcTableComponent],
      providers: [
        ResizeService,
        { provide: WINDOW, useFactory: (() => { return { innerWidth: CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE } }) }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TestSfcTableComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      fixture.detectChanges();
    });
  }));

  describe('Column content', () => {

    fit("Should add column from template reference", async(() => {
      component.table.columns = [{ columnName: 'column-name-reference', fieldName: '' }];
      component.table.columnTemplateRef = component.columnTemplateRef;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h1.column-ref').innerText).toEqual(component.table.columns[0].columnName);
      expect(fixture.nativeElement.querySelector('h2.column-content')).toBeNull();
      expect(fixture.nativeElement.querySelector('sfc-default-table-column')).toBeNull();
    }));

    fit("Should add column from template content", async(() => {
      component.table.columns = [{ columnName: 'column-name-content', fieldName: '' }];
      component.showContent = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h1.column-ref')).toBeNull();
      expect(fixture.nativeElement.querySelector('h2.column-content').innerText).toEqual(component.table.columns[0].columnName);
      expect(fixture.nativeElement.querySelector('sfc-default-table-column')).toBeNull();
    }));
  });

  describe('Row content', () => {

    fit("Should add row from template reference", async(() => {
      component.table.columns = [{ columnName: '', fieldName: '' }];
      component.table.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
      component.table.rowTemplateRef = component.rowTemplateRef;
      fixture.detectChanges();

      const rowsEls = fixture.nativeElement.querySelectorAll('div.row-ref');

      rowsEls.forEach((row, index) => {
        expect(row.querySelector('h1.data').innerText).toEqual(component.table.data[index].data.field.toString());
        expect(row.querySelector('span.column-width').innerText).toEqual('1');
        expect(row.querySelector('span.column-position').innerText).toEqual(PositionSideType.Center);
      });

      expect(fixture.nativeElement.querySelector('div.row-content')).toBeNull();
      expect(fixture.nativeElement.querySelector('sfc-default-table-row')).toBeNull();
    }));

    fit("Should add row from template content", async(() => {
      component.table.columns = [{ columnName: 'column-name-content', fieldName: '' }];
      component.table.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
      component.showContent = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.row-ref')).toBeNull();

      const rowsEls = fixture.nativeElement.querySelectorAll('div.row-content');

      rowsEls.forEach((row, index) => {
        expect(row.querySelector('h2.data').innerText).toEqual(component.table.data[index].data.field.toString());
        expect(row.querySelector('span.column-width').innerText).toEqual('1');
        expect(row.querySelector('span.column-position').innerText).toEqual(PositionSideType.Center);
      });

      expect(fixture.nativeElement.querySelector('sfc-default-table-row')).toBeNull();
    }));

  });

  describe('Card content', () => {

    fit("Should add card from template reference", async(() => {
      component.table.columns = [{ columnName: '', fieldName: '' }];
      component.table.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
      component.table.dataType = TableDataType.Cards;
      component.table.cardTemplateRef = component.cardTemplateRef;
      fixture.detectChanges();

      const cardsEls = fixture.nativeElement.querySelectorAll('div.card-ref');

      cardsEls.forEach((card, index) => {
        expect(card.querySelector('h1.data').innerText).toEqual(component.table.data[index].data.field.toString());
      });

      expect(fixture.nativeElement.querySelector('div.card-content')).toBeNull();
      expect(fixture.nativeElement.querySelector('sfc-default-table-card')).toBeNull();
    }));

    fit("Should add card from template content", async(() => {
      component.table.columns = [{ columnName: 'column-name-content', fieldName: '' }];
      component.table.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
      component.table.dataType = TableDataType.Cards;
      component.showContent = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.card-ref')).toBeNull();

      const cardsEls = fixture.nativeElement.querySelectorAll('div.card-content');

      cardsEls.forEach((card, index) => {
        expect(card.querySelector('h2.data').innerText).toEqual(component.table.data[index].data.field.toString());
      });

      expect(fixture.nativeElement.querySelector('sfc-default-table-card')).toBeNull();
    }));

  });

});