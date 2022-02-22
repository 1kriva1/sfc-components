import { Component, Input } from '@angular/core';
import { IColumnConfig } from '../../../../common/interfaces/sfc-table/IColumnModel';

@Component({
  selector: 'sfc-default-table-column',
  templateUrl: './sfc-default-table-column.component.html',
  styleUrls: ['./sfc-default-table-column.component.css', './sfc-default-table-column-dark-theme.component.css']
})
export class SfcDefaultTableColumnComponent {

  @Input()
  column: IColumnConfig = { columnName: '', fieldName: '' };
}