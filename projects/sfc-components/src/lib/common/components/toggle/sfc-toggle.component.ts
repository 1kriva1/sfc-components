import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CommonConstants } from '../../constants/common-constants';
import { IToggleConfig } from '../../interfaces/sfc-toggle/IToggleConfig';
import { CommonUtils } from '../../utils/common-utils';

@Component({
  selector: 'sfc-toggle',
  templateUrl: './sfc-toggle.component.html',
  styleUrls: ['./sfc-toggle.component.css', './sfc-toggle-dark-theme.component.css']
})
export class SfcToggleComponent implements OnInit {

  @Input()
  value: boolean = false;

  @Input()
  config: IToggleConfig;

  @Output('on-toggle')
  onToggle = new EventEmitter<boolean>();

  ngOnInit() {
    if (!CommonUtils.isDefined(this.config)) {
      this.config = { checkedItem: CommonConstants.TOGGLE_DEFAULTS.CHECKED_ITEM, uncheckedItem: CommonConstants.TOGGLE_DEFAULTS.UNCHECKED_ITEM };
    }
  }

  get label(): string {
    return this.value ? this.config.checkedItem.label : this.config.uncheckedItem.label;
  }

  @HostListener('click')
  onClick() {
    this.value = !this.value;
    this.onToggle.emit(this.value);
  }
}