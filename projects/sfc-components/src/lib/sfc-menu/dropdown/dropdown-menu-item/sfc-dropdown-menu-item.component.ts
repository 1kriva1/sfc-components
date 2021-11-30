import { Component, Input, OnInit } from '@angular/core';
import IDropdownMenuItem from '../../../common/interfaces/sfc-menu/dropdown/IDropdownMenuItem';
import { CommonUtils } from '../../../common/utils/common-utils';

@Component({
    selector: 'sfc-dropdown-menu-item',
    templateUrl: './sfc-dropdown-menu-item.component.html',
    styleUrls: ['./sfc-dropdown-menu-item.component.css']
})
export class SfcDropdownMenuItemComponent implements OnInit {

    @Input()
    item: IDropdownMenuItem;

    ngOnInit(): void {
        this.item = CommonUtils.isDefined(this.item) ? this.item : {};
    }

    get iconClass() {
        const classes = {};

        if (this.item && this.item.icon) {
            // example: fa fa-star
            const iconParts = this.item.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        return classes;
    }

    onClick(){
        if(this.item.onClick)
        this.item.onClick();
    }
}