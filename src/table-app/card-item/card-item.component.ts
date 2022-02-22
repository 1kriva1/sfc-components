import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {

  @Input()
  columns: any[];

  @Input()
  data: any;
}
