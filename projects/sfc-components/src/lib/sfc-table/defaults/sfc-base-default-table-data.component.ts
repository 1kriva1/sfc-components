import { AfterViewInit, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { TableColumnType } from "../../common/constants/common-constants";
import IDataModel from "../../common/interfaces/sfc-table/IDataConfig";
import { ISelectionEvent } from "../../common/interfaces/sfc-table/ISelectionEvent";

export default abstract class SfcBaseDefaultTableDataComponent implements AfterViewInit, OnDestroy {

    TableColumnType = TableColumnType;

    @Input()
    data: IDataModel = { model: { data: null }, index: undefined };

    @Input('select-on-click')
    selectOnClick: boolean = false;

    @Output('on-select')
    onSelect: EventEmitter<ISelectionEvent> = new EventEmitter<ISelectionEvent>();

    @ViewChild('columnCheckmark', { static: false })
    columnCheckmarkEl: ElementRef;

    columnCheckmarkOnClickSubscription: Subscription;

    ngAfterViewInit(): void {
        if (this.columnCheckmarkEl) {
            this.columnCheckmarkOnClickSubscription = fromEvent(this.columnCheckmarkEl.nativeElement, 'click').subscribe((event: PointerEvent) => {
                if (this.selectOnClick)
                    event.stopPropagation();

                this.selectRow();
            });
        }
    }

    ngOnDestroy(): void {
        if (this.columnCheckmarkOnClickSubscription)
            this.columnCheckmarkOnClickSubscription.unsubscribe();
    }

    get isEven(): boolean {
        return (this.data.index + 1) % 2 == 0;
    }

    selectRow() {
        if (this.onSelect)
            this.onSelect.emit({ rowIndex: this.data.index, selected: !this.data.model.selected });
    }
}