import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SchemePlayerPointType } from '../../../common/constants/common-constants';

@Component({
  selector: 'sfc-scheme-player',
  templateUrl: './sfc-scheme-player.component.html',
  styleUrls: ['./sfc-scheme-player.component.css']
})
export class SfcSchemePlayerComponent implements OnInit {

  @Input()
  data: any;

  @Output('on-add')
  onAdd = new EventEmitter<void>();

  get type(){
    return this.data != null
      ? SchemePlayerPointType.Badge
      : SchemePlayerPointType.Point;
  }

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    if (this.onAdd)
      this.onAdd.emit();
  }
}
