import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
  ChangeDetectorRef, Component, ContentChildren, HostBinding, Inject, Input,
  IterableDiffer, IterableDiffers, OnInit, QueryList, TemplateRef
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PaginationService } from '../common/components/pagination/service/pagination.service';
import { CommonConstants, PositionSideType, SortingDirection, TableColumnType, TableDataType } from '../common/constants/common-constants';
import { TemplateReferenceDirective } from '../common/directives/template-reference/template-reference.directive';
import IPaginationConfig from '../common/interfaces/sfc-pagination/IPaginationConfig';
import IPaginationEvent from '../common/interfaces/sfc-pagination/IPaginationEvent';
import ISortingEvent from '../common/interfaces/sfc-sorting/ISortingEvent';
import { IColumnModel, IColumnConfig } from '../common/interfaces/sfc-table/IColumnModel';
import IDataModel from '../common/interfaces/sfc-table/IDataModel';
import { ISelectionEvent } from '../common/interfaces/sfc-table/ISelectionEvent';
import { IToggleConfig } from '../common/interfaces/sfc-toggle/IToggleConfig';
import { ResizeService } from '../common/services/resize.service';
import { SortingService } from '../common/services/sorting/sorting.service';
import { CollectionUtils } from '../common/utils/collection-utils';
import { CommonUtils } from '../common/utils/common-utils';
import { ColumnsToggleService } from './services/columns-toggle/columns-toggle.service';
import { TableSelectedService } from './services/table-selected/table-selected.service';
import IDataConfig from '../common/interfaces/sfc-table/IDataConfig';
import { WINDOW } from '../common/services/window-ref.service';

@Component({
  selector: 'sfc-table',
  templateUrl: './sfc-table.component.html',
  styleUrls: ['./sfc-table.component.css'],
  providers: [PaginationService, SortingService, TableSelectedService, ColumnsToggleService, ResizeService]
})
export class SfcTableComponent implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, AfterViewChecked {

  TableDataType = TableDataType;

  TableColumnType = TableColumnType;

  private readonly sequenceColumn: IColumnConfig = { columnName: '№', fieldName: '', type: TableColumnType.Sequence };

  private readonly selectableColumn: IColumnConfig = { columnName: '', fieldName: '', type: TableColumnType.Selectable };

  private readonly expandedColumn: IColumnConfig = { columnName: '', fieldName: '', type: TableColumnType.Expanded };

  public readonly TYPE_TOGGLE_CONFIG: IToggleConfig = {
    checkedItem: {
      label: 'Cards',
      icon: 'fas fa-th-list'
    },
    uncheckedItem: {
      label: 'List',
      icon: 'fas fa-th'
    }
  };

  @Input('column-position')
  columnPosition: PositionSideType = PositionSideType.Center;

  @Input('column-delimeter')
  columnDelimeter: boolean = false;

  @Input('data-type')
  @HostBinding('class')
  dataType: TableDataType = TableDataType.Rows;

  @Input('data-toggle')
  showDataToggle: boolean = true;

  @Input('show-columns')
  showColumns: boolean = true;

  // Template references 

  @Input('column-template-ref')
  columnTemplateRef: TemplateRef<any>;

  @Input('row-template-ref')
  rowTemplateRef: TemplateRef<any>;

  @Input('card-template-ref')
  cardTemplateRef: TemplateRef<any>;

  // End Template references

  @Input('default-column-template')
  defaultColumnTemplate: boolean = true;

  @Input('default-row-template')
  defaultRowTemplate: boolean = true;

  @Input('default-card-template')
  defaultCardTemplate: boolean = true;

  // Data

  @Input()
  data: IDataModel[] = [];

  @Input('data-async')
  data$: Observable<IDataModel[]>;

  private dataDiffer: IterableDiffer<any>;

  private dataSubject: BehaviorSubject<IDataModel[]>;

  dataValue$: Observable<IDataConfig[]>;

  // End Data 

  // Columns

  @Input()
  columns: IColumnModel[] = [];

  private columnsDiffer: IterableDiffer<IColumnModel>;

  private columnsSubject: BehaviorSubject<IColumnModel[]> = new BehaviorSubject<IColumnModel[]>(this.columns);

  columns$: Observable<IColumnConfig[]>;

  columnsSorting$: Observable<IColumnConfig[]>;

  columnWidth$: Observable<number>;

  // End Columns  

  @Input()
  pagination: IPaginationConfig;

  @Input('sequence')
  showSequence: boolean = false;

  @Input()
  expanded: boolean = false;

  @Input()
  selectable: boolean = false;

  @Input('select-on-click')
  selectOnClick: boolean = false;

  allRowsSelected: boolean;

  public vm$: Observable<any>;

  @ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
  private templates: QueryList<TemplateReferenceDirective> | undefined;

  constructor(
    @Inject(WINDOW) private window: Window,
    private paginationService: PaginationService,
    private selectedService: TableSelectedService,
    private sortingService: SortingService,
    private changeDetector: ChangeDetectorRef,
    private resizeService: ResizeService,
    private columnsToggleService: ColumnsToggleService,
    iterableDiffers: IterableDiffers) {
    this.dataDiffer = iterableDiffers.find([]).create<IterableDiffer<IDataModel>>(null);
    this.columnsDiffer = iterableDiffers.find([]).create<IColumnModel>(null);
  }

  // TEMPLATES

  get columnTemplate(): TemplateReferenceDirective {
    return CollectionUtils.getItem(this.templates.toArray(), t => t.templateName == CommonConstants.TABLE_DEFAULTS.TEMPLATE.COLUMN);
  }

  get rowTemplate(): TemplateReferenceDirective {
    return CollectionUtils.getItem(this.templates.toArray(), t => t.templateName == CommonConstants.TABLE_DEFAULTS.TEMPLATE.ROW);
  }

  get cardTemplate(): TemplateReferenceDirective {
    return CollectionUtils.getItem(this.templates.toArray(), t => t.templateName == CommonConstants.TABLE_DEFAULTS.TEMPLATE.CARD);
  }

  get isShowDefaultColumn(): boolean {
    return this.defaultColumnTemplate && !CommonUtils.isDefined(this.columnTemplateRef) && !CommonUtils.isDefined(this.columnTemplate);
  }

  get isShowDefaultRow(): boolean {
    return this.defaultRowTemplate && !CommonUtils.isDefined(this.rowTemplateRef) && !CommonUtils.isDefined(this.rowTemplate);
  }

  get isShowDefaultCard(): boolean {
    return this.defaultCardTemplate && !CommonUtils.isDefined(this.cardTemplateRef) && !CommonUtils.isDefined(this.cardTemplate);
  }

  // END TEMPLATES

  ngOnInit(): void {
    // by default pagination is enabled
    if (!CommonUtils.isDefined(this.pagination))
      this.pagination = { enabled: true, page: CommonConstants.TABLE_DEFAULTS.INITIAL_PAGE, pageSize: CommonConstants.TABLE_DEFAULTS.PAGE_SIZE };

    // if data is static, make it observable
    if (!CommonUtils.isDefined(this.data$)) {
      this.dataSubject = new BehaviorSubject(this.data);
      this.data$ = this.dataSubject.asObservable();
    }

    // set up data models with indexes
    const dataArray$: Observable<IDataConfig[]> = this.data$.pipe(
      map((dataArray) => dataArray.map((modelItem, index) => {
        return { index, model: modelItem }
      }))
    );

    // set up columns (conditionally add sequence or selectable columns)
    this.columns$ = this.columnsSubject.asObservable().pipe(
      map(columns => {
        let tableColumns = columns.slice(0);

        if (this.showSequence)
          tableColumns.unshift(this.sequenceColumn);

        if (this.selectable)
          tableColumns.unshift(this.selectableColumn);

        if(this.expanded)
          tableColumns.push(this.expandedColumn);

        return tableColumns;
      })
    );

    // required to init pagination
    this.paginationService.initPagination(this.data$, this.pagination.page, this.pagination.pageSize);

    // set up sorting observaable
    const firstSortingColumn: IColumnModel = CollectionUtils.getItem(this.columns, col => CommonUtils.isDefined(col.sorting) && col.sorting.enabled),
      sorting$: Observable<ISortingEvent> = this.sortingService.sorting$.pipe(
        startWith(firstSortingColumn ? { sortingId: firstSortingColumn.fieldName, direction: firstSortingColumn.sorting.direction } : null)
      );

    this.columnsSorting$ = combineLatest([this.columns$, sorting$]).pipe(
      map(([columns, event]) => {
        columns.forEach(column => {
          if (column.sorting) {
            column.sorting.active = column.sorting.enabled && event && column.fieldName == event.sortingId;

            if (!column.sorting.active)
              column.sorting.direction = SortingDirection.Ascending;
          }
        });

        return columns;
      })
    );

    // set up selection observable
    const selection$: Observable<ISelectionEvent> = this.selectedService.selectedAction$.pipe(
      startWith(null)
    );

    // set up main data observable
    this.dataValue$ = combineLatest([
      dataArray$,
      this.paginationService.pageSource$,
      sorting$,
      selection$
    ]).pipe(
      map(([data, paginationEvent, sortingEvent, selectionEvent]) => {
        // handle selection
       this.handleSelectionEvent(data, selectionEvent);

        // handle pagination and sorting
        let sortedData = this.sortData(data, sortingEvent),
          paginatedData = this.paginateData(sortedData, paginationEvent);

        // handle data sequence  
        if (this.showSequence) {
          this.updateRowSequenceValues(paginationEvent.page, paginatedData)
        }

        return paginatedData;
      })
    );
  }

  ngAfterViewInit(): void {
    // combine all observable to view model
    this.vm$ = combineLatest([
      this.columnsSorting$,
      this.dataValue$,
      this.columnsToggleService.showColumns$,
      this.columnWidth$
    ]).pipe(
      map(([columns, data, showColumns, columnWidth]) =>
        ({ columns, data, showColumns, columnWidth })
      ));
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngDoCheck() {
    if (this.dataDiffer.diff(this.data)) {
      this.dataSubject.next(this.data);
    }

    if (this.columnsDiffer.diff(this.columns)) {
      this.columnsSubject.next(this.columns);
    }
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngAfterContentInit(): void {
    this.columnWidth$ = combineLatest([
      this.resizeService.onResize$.pipe(startWith({})),
      this.columns$
    ]).pipe(map(([_, columns]) => this.getColumnWidth(this.window.innerWidth, columns.length)));
  }

  onTypeToggle(value: boolean) {
    this.dataType = value ? TableDataType.Cards : TableDataType.Rows;
  }

  selectRow(model: ISelectionEvent): void {
    this.selectedService.selectRow(model.rowIndex, model.selected);
  }

  private getColumnWidth(windowWidth: number, columnsLength: number) {
    if (windowWidth <= CommonConstants.MEDIA_LIMITS.MOBILE_MAX_SIZE)
      return 1;

    if (windowWidth <= CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE)
      return Math.ceil(columnsLength / 2);

    return columnsLength;
  }

  private handleSelectionEvent(data: IDataConfig[], selectionEvent: ISelectionEvent) {
    if (selectionEvent != null) {
      if (selectionEvent.rowIndex == null) {
        data.forEach(item => {
          item.model.selected = selectionEvent.selected;
        });

      } else {
        data.forEach(item => {
          if (selectionEvent.rowIndex == item.index) {
            item.model.selected = selectionEvent.selected;
          }
        });
      }
    }

    this.allRowsSelected = CollectionUtils.all(data, item => item.model.selected);
  }

  private paginateData(data: IDataConfig[], paginationEvent: IPaginationEvent): IDataConfig[] {
    let pagedData = this.pagination.enabled
      ? data.slice((paginationEvent.page - 1) * this.pagination.pageSize, paginationEvent.page * this.pagination.pageSize)
      : data;

    return pagedData;
  }

  private sortData(data: IDataConfig[], sortingEvent: ISortingEvent): IDataConfig[] {
    let sortedData = CommonUtils.isDefined(sortingEvent) && CollectionUtils.any(this.columns, col => col.fieldName == sortingEvent.sortingId)
      ? CollectionUtils.sortBy(data, `model.data.${sortingEvent.sortingId}`, sortingEvent.direction)
      : data;

    return sortedData;
  }

  private updateRowSequenceValues(page: number, data: any[]) {
    let from = (page - 1) * this.pagination.pageSize;
    data.forEach(item => {
      item.sequenceNumber = from + 1;
      from++;
    });
  }
}