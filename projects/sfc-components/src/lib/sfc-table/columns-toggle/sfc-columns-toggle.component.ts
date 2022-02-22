import { Component, HostListener } from '@angular/core';
import { CommonConstants } from '../../common/constants/common-constants';
import { ColumnsToggleService } from '../services/columns-toggle/columns-toggle.service';

@Component({
  selector: 'sfc-columns-toggle',
  templateUrl: './sfc-columns-toggle.component.html',
  styleUrls: ['./sfc-columns-toggle.component.css']
})
export class SfcColumnsToggleComponent {

  COLUMN_TOGGLE_ICONS = {
    HIDE: CommonConstants.TABLE_DEFAULTS.COLUMNS_TOGGLE.HIDE.ICON,
    SHOW: CommonConstants.TABLE_DEFAULTS.COLUMNS_TOGGLE.SHOW.ICON
  }

  @HostListener('click')
  onToggle() {
    this.columnsToggleService.toggleColumns();
  }

  constructor(public columnsToggleService: ColumnsToggleService) { }

  getToggle(value: boolean) {
    return {
      label: value
        ? CommonConstants.TABLE_DEFAULTS.COLUMNS_TOGGLE.HIDE.LABEL
        : CommonConstants.TABLE_DEFAULTS.COLUMNS_TOGGLE.SHOW.LABEL,
      showColumns: value
    }
  }
}