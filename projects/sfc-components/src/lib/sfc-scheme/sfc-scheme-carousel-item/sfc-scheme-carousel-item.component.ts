import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISchemeCarouselFormationConfig } from '../../common/interfaces/sfc-scheme/ISchemeCarouselFormationConfig';
import { ISchemeFormationData } from '../../common/interfaces/sfc-scheme/ISchemeFormationData';
import { CollectionUtils } from '../../common/utils/collection-utils';
import { CommonUtils } from '../../common/utils/common-utils';

@Component({
  selector: 'sfc-scheme-carousel-item',
  templateUrl: './sfc-scheme-carousel-item.component.html',
  styleUrls: ['./sfc-scheme-carousel-item.component.css']
})
export class SfcSchemeCarouselItemComponent implements OnInit {

  @Input()
  config: ISchemeCarouselFormationConfig;

  @Output('on-select')
  onSelect = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    if (!CommonUtils.isDefined(this.config))
      this.config = { id: '', formation: [], selected: false };
  }

  onClick() {
    if (this.onSelect)
      this.onSelect.emit();
  }
}
