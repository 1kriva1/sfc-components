import { Component, EventEmitter, Input, Output } from '@angular/core';
import SfcBaseDefaultTableDataComponent from '../../base/sfc-base-default-table-data.component';
import IDataModel from '../../../common/interfaces/sfc-table/IDataConfig';
import { IColumnConfig } from '../../../common/interfaces/sfc-table/IColumnModel';
import { ISelectionEvent } from "../../../common/interfaces/sfc-table/ISelectionEvent";

@Component({
  selector: 'sfc-default-table-card',
  templateUrl: './sfc-default-table-card.component.html',
  styleUrls: ['./sfc-default-table-card.component.css']
})
export class SfcDefaultTableCardComponent extends SfcBaseDefaultTableDataComponent {

  @Input()
  data: IDataModel = { model: { data: null }, index: undefined };

  @Input()
  columns: IColumnConfig[] = [];

  @Input('select-on-click')
  selectOnClick: boolean = false;

  @Output('on-select')
  onSelect: EventEmitter<ISelectionEvent> = new EventEmitter<ISelectionEvent>();
}