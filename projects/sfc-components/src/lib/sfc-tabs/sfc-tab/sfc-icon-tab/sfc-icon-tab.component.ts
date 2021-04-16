import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonConstants } from '../../../common/constants/common-constants';
import { CommonUtils } from '../../../common/utils/common-utils';
import BaseTabComponent from '../sfc-base-tab.component';

@Component({
    selector: 'sfc-icon-tab',
    templateUrl: './sfc-icon-tab.component.html',
    styleUrls: ['./sfc-icon-tab.component.css'],
    providers: [{ provide: BaseTabComponent, useExisting: SfcIconTabComponent }]
})
export class SfcIconTabComponent extends BaseTabComponent implements OnInit {

    @HostBinding('style.width')
    width:string;

    ngOnInit(): void {
        this.icon = CommonUtils.isDefined(this.icon) ? this.icon : CommonConstants.TAB_DEFAULT_ICON;
    }
}