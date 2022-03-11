import { Component, Input } from '@angular/core';
import { TableSelectedService } from '../../services/table-selected/table-selected.service';
import { CommonConstants } from '../../../common/constants/common-constants';

@Component({
  selector: 'sfc-selectable-table-column',
  templateUrl: './sfc-selectable-table-column.component.html',
  styleUrls: ['./sfc-selectable-table-column.component.css', './sfc-selectable-table-column-dark-theme.component.css']
})
export class SfcSelectableTableColumnComponent {

  @Input()
  selected: boolean = false;

  DEFAULT_COLUMN_TEXT_SELECT_ALL: string = CommonConstants.TABLE_DEFAULTS.DEFAULT_COLUMN_TEXT_SELECT_ALL;

  constructor(private selectedService: TableSelectedService) { }

  selectAllRows() {
    this.selected = !this.selected;
    this.selectedService.selectAllRows(this.selected);
  }
}