import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'table-row-item',
  templateUrl: './row-item.component.html',
  styleUrls: ['./row-item.component.css']
})
export class RowItemComponent {

  @Input()
  columns: any[];

  @Input()
  data: any;

  @Input('column-width')
  columnWidth: number;

  @Input('column-position')
  columnPosition: string;

  @Output('on-select')
  onSelect: EventEmitter<any> = new EventEmitter<any>();

  get columnStyle(): { width: string } {
    return {
      width: `calc(100% / ${this.columnWidth})`
    };
  }

  onClick(){
    if(this.onSelect)
      this.onSelect.emit({rowIndex: this.data.index, selected:!this.data.model.selected});
  }
}
