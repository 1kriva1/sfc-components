import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent {

  @Input()
  label: string;

  @Input()
  icon: string;

  @Input()
  color: string;
}