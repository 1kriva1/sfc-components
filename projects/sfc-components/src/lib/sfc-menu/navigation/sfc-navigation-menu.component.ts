import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import INavigationMenuConfig from '../../common/interfaces/sfc-menu/navigation/INavigationMenuConfig';
import ISideMenuItem from '../../common/interfaces/sfc-menu/side/ISideMenuItem';
import { CommonUtils } from '../../common/utils/common-utils';

@Component({
    selector: 'sfc-navigation-menu',
    templateUrl: './sfc-navigation-menu.component.html',
    styleUrls: ['./sfc-navigation-menu.component.css', './sfc-navigation-menu-dark-theme.component.css']
})
export class SfcNavigationMenuComponent implements OnInit {

    @Input()
    config: INavigationMenuConfig;

    @Output('on-select')
    onSelect: EventEmitter<ISideMenuItem> = new EventEmitter<ISideMenuItem>();

    ngOnInit() {
        this.config = CommonUtils.isDefined(this.config) ? this.config : { items: [] }
    }

    onClick(item: ISideMenuItem) {
        this.config.items.forEach((item) => item.isActive = false);
        item.isActive = true;

        if (this.onSelect)
            this.onSelect.emit(item);
    }
}