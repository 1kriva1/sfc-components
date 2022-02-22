import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IColumnConfig } from '../../../../common/interfaces/sfc-table/IColumnModel';
import { PositionSideType } from '../../../../common/constants/common-constants';
import { ISelectionEvent } from "../../../../common/interfaces/sfc-table/ISelectionEvent";
import IDataModel from '../../../../common/interfaces/sfc-table/IDataConfig';
import { CommonUtils } from '../../../../common/utils/common-utils';
import SfcBaseDefaultTableDataComponent from '../../sfc-base-default-table-data.component';

@Component({
  selector: 'sfc-default-table-row',
  templateUrl: './sfc-default-table-row.component.html',
  styleUrls: ['./sfc-default-table-row.component.css']
})
export class SfcDefaultTableRowComponent extends SfcBaseDefaultTableDataComponent implements OnInit {

  @Input()
  data: IDataModel = { model: { data: null }, index: undefined };

  @Input()
  columns: IColumnConfig[] = [];

  @Input('column-position')
  columnPosition: PositionSideType = PositionSideType.Start;

  @Input('column-width')
  columnWidth: number;

  @Input('sequence')
  showSequence: boolean = false;

  @Input('select-on-click')
  selectOnClick: boolean = false;

  @Output('on-select')
  onSelect: EventEmitter<ISelectionEvent> = new EventEmitter<ISelectionEvent>();

  ngOnInit(): void {
    if (!CommonUtils.isDefined(this.columnWidth))
      this.columnWidth = this.columns.length;
  }

  get columnStyle(): { width: string } {
    return {
      width: `calc(100% / ${this.columnWidth})`
    };
  }
}