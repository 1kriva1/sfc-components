import { Component, Input, OnInit } from '@angular/core';
import INavigationMenuItem from '../../../common/interfaces/sfc-menu/navigation/INavigationMenuItem';
import { CommonUtils } from '../../../common/utils/common-utils';

@Component({
    selector: 'sfc-navigation-menu-item',
    templateUrl: './sfc-navigation-menu-item.component.html',
    styleUrls: ['./sfc-navigation-menu-item.component.css', './sfc-navigation-menu-item-dark-theme.component.css']
})
export class SfcNavigationMenuItemComponent implements OnInit {

    @Input()
    item: INavigationMenuItem;

    get iconClass() {
        const classes = {};

        if (this.item && this.item.icon) {
            // example: fa fa-star
            const iconParts = this.item.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        return classes;
    }

    ngOnInit(): void {
        this.item = CommonUtils.isDefined(this.item) ? this.item : { id: null };
    }
}