import { Component, HostBinding, Input } from '@angular/core';
import { StyleClass } from '../../../common/constants/common-constants';
import ISideMenuItem from '../../../common/interfaces/sfc-menu/side/ISideMenuItem';
import { BaseSideMenuItem } from '../side-menu-item-base/side-menu-item-base.component';

@Component({
    selector: 'sfc-side-menu-item',
    templateUrl: './sfc-side-menu-item.component.html',
    styleUrls: ['../side-menu-item-base/side-menu-item-base.component.css', '../side-menu-item-base/side-menu-item-base-dark-theme.component.css',
        './sfc-side-menu-item.component.css']
})
export class SfcSideMenuItemComponent extends BaseSideMenuItem {
    
}