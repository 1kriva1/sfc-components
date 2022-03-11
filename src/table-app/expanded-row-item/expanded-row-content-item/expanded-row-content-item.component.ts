import { Component, Input } from '@angular/core';

@Component({
  selector: 'expanded-row-content-item',
  templateUrl: './expanded-row-content-item.component.html',
  styleUrls: ['./expanded-row-content-item.component.css']
})
export class ExpandedRowContentItemComponent {

  @Input()
  data: any;

  @Input('column-width')
  columnWidth: number;

  @Input('column-position')
  columnPosition: string;

  get columnStyle(): { width: string } {
    return {
      width: `calc(100% / ${this.columnWidth})`
    };
  }
}