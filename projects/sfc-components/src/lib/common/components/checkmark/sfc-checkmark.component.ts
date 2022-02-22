import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants } from '../../constants/common-constants';
import { CommonUtils } from '../../utils/common-utils';

@Component({
  selector: 'sfc-checkmark',
  templateUrl: './sfc-checkmark.component.html',
  styleUrls: ['./sfc-checkmark.component.css']
})
export class SfcCheckmarkComponent implements OnInit {

  @Input()
  checked: boolean = false;

  @Input()
  icon: string;

  ngOnInit(): void {
    if (CommonUtils.isNullOrEmptyString(this.icon))
      this.icon = CommonConstants.CHECKMARK_DEFAULTS.ICON;
  }

  onToggle() {
    this.checked = !this.checked;
  }
}
