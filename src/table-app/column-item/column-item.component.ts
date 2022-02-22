import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.css']
})
export class ColumnItemComponent {
  @Input()
  label: string;

  @Input()
  active: boolean;
}
