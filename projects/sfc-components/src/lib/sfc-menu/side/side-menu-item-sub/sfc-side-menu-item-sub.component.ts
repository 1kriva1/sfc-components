import { Component, EventEmitter, Output } from '@angular/core';
import ISideMenuItem from '../../../common/interfaces/sfc-menu/side/ISideMenuItem';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { animate, style, transition, trigger } from '@angular/animations';
import { CollectionUtils } from '../../../common/utils/collection-utils';
import { CommonUtils } from '../../../common/utils/common-utils';
import BaseSideMenuItem from '../side-menu-item-base/side-menu-item-base.component';

@Component({
    selector: 'sfc-side-menu-item-sub',
    templateUrl: './sfc-side-menu-item-sub.component.html',
    styleUrls: ['../side-menu-item-base/side-menu-item-base.component.css', '../side-menu-item-base/side-menu-item-base-dark-theme.component.css',
        './sfc-side-menu-item-sub.component.css', './sfc-side-menu-item-sub-dark-theme.component.css'],
    animations: [
        trigger(
            'enterAnimation', [
            transition(':enter', [
                style({ transform: 'translateX(-100%)', opacity: 0 }),
                animate('400ms', style({ transform: 'translateX(0%)', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'translateX(0%)', opacity: 1 }),
                animate('400ms', style({ transform: 'translateX(-100%)', opacity: 0 }))
            ])
        ]
        )
    ],
})
export class SfcSideMenuItemSubComponent extends BaseSideMenuItem {

    @Output('on-click')
    onClick: EventEmitter<ISideMenuItem> = new EventEmitter<ISideMenuItem>();

    isLocalOpen: boolean;

    get arrowIcon() {
        return this.isLocalOpen ? faAngleUp : faAngleDown;
    }

    get isParentActive() {
        if (!this.isLocalOpen) {
            return CommonUtils.isDefined(CollectionUtils.getItem(this.item.items, (item: ISideMenuItem) => item.isActive));
        }

        return false;
    }

    ngOnInit() {
        super.ngOnInit();
        this.isLocalOpen = CommonUtils.isDefined(CollectionUtils.getItem(this.item.items, (item: ISideMenuItem) => item.isActive));
    }

    onChildClick(item: ISideMenuItem) {
        this.item.items.forEach((item) => item.isActive = false);

        if (this.onClick)
            this.onClick.emit(item);
    }
}