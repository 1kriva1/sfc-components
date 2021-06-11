import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { SideMenuType, StyleClass } from '../../common/constants/common-constants';
import ISideMenuConfig from '../../common/interfaces/sfc-menu/side/ISideMenuConfig';
import ISideMenuItem from '../../common/interfaces/sfc-menu/side/ISideMenuItem';
import { CollectionUtils } from '../../common/utils/collection-utils';
import { CommonUtils } from '../../common/utils/common-utils';

@Component({
    selector: 'sfc-side-menu',
    templateUrl: './sfc-side-menu.component.html',
    styleUrls: ['./sfc-side-menu.component.css', './sfc-side-menu-dark-theme.component.css']
})
export class SfcSideMenuComponent implements OnInit {

    @Input()
    config: ISideMenuConfig;

    @Output('on-select')
    onSelect: EventEmitter<ISideMenuItem> = new EventEmitter<ISideMenuItem>();

    @HostBinding('class.' + StyleClass.Open)
    isOpen: boolean = false;    

    @HostBinding('class.' + StyleClass.Empty)
    get isEmptyItems() {
        return !CollectionUtils.any(this.config.items);
    }

    SideMenuType = SideMenuType;

    ngOnInit() {
        this.config = CommonUtils.isDefined(this.config) ? this.config : { items: [] }
        this.isOpen = this.config.isOpen;
    }

    onClick(item: ISideMenuItem) {
        this.config.items.forEach((item) => this.setActive(item, false, true));
        this.setActive(item, true);

        if (this.onSelect)
            this.onSelect.emit(item);
    }

    setActive(item: ISideMenuItem, value: boolean, recursively: boolean = false) {
        item.isActive = value;

        if (recursively && CollectionUtils.any(item.items))
            item.items.forEach((item) => item.isActive = value);
    }
}