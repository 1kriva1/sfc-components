import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'dropdown-menu-app',
    templateUrl: './dropdown-menu-app.component.html',
    styleUrls: [
        '../../app/app.component.css'
    ]
})
export class DropdownMenuAppComponent extends BaseAppComponent {

    private menuConfig: any = {
        items: [
            {
                label: 'Photos/Videos',
                icon: 'fas fa-star'
            },
            {
                label: 'Products',
                icon: 'fab fa-line'
            },
            {
                label: 'Services',
                icon: 'fas fa-chart-pie'
            },
            {
                label: 'Coupouns',
                icon: 'fab fa-discourse'
            },
            {
                label: 'User Reviews',
                icon: 'fas fa-user-friends',
                delimeter: false
            },
            {
                label: 'Subscription',
                icon: 'fas fa-newspaper'
            },
            {
                label: 'Stats',
                icon: 'fas fa-calendar',
                delimeter: false
            },
            {
                label: 'Delete Business',
                icon: 'fas fa-trash'
            }
        ],
        clickOutside: false,
        bordered: false,
        hideOnClick: false,
        position: '',
        icon: '',
        label: ''
    }

    private menuConfigRight;
    private menuConfigTopRight;
    private menuConfigTopLeft;
    private menuConfigCenter;
    private menuConfigCenterTop;

    private menuConfigClickOutSide;
    private menuConfigBordered;
    private menuConfigHideOnClick;

    private menuConfigIcon;
    private menuConfigLabel;
    private menuConfigIconLabel;

    private menuConfigOne;
    private menuConfigTwo;
    private menuConfigThree;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);

        this.menuConfigRight = { ...this.menuConfig };
        this.menuConfigRight.position = 'right';

        this.menuConfigTopRight = { ...this.menuConfig };
        this.menuConfigTopRight.position = 'right top';

        this.menuConfigTopLeft = { ...this.menuConfig };
        this.menuConfigTopLeft.position = 'left top';

        this.menuConfigCenter = { ...this.menuConfig };
        this.menuConfigCenter.position = 'center';

        this.menuConfigCenterTop = { ...this.menuConfig };
        this.menuConfigCenterTop.position = 'center top';

        this.menuConfigClickOutSide = { ...this.menuConfig };
        this.menuConfigClickOutSide.clickOutside = true;

        this.menuConfigBordered = { ...this.menuConfig };
        this.menuConfigBordered.bordered = true;

        this.menuConfigHideOnClick = { ...this.menuConfig };
        this.menuConfigHideOnClick.hideOnClick = true;

        this.menuConfigIcon = { ...this.menuConfig };
        this.menuConfigIcon.icon = 'fa fa-star';

        this.menuConfigLabel = { ...this.menuConfig };
        this.menuConfigLabel.label = 'Default label';

        this.menuConfigIconLabel = { ...this.menuConfig };
        this.menuConfigIconLabel.label = 'Default label';
        this.menuConfigIconLabel.icon = 'fa fa-star';

        this.menuConfigOne = { ...this.menuConfig };
        this.menuConfigOne.label = 'One item only';
        this.menuConfigOne.icon = 'fa fa-star';
        this.menuConfigOne.bordered = true;
        this.menuConfigOne.items = [{
            label: 'Photos/Videos',
            icon: 'fas fa-star'
        }];

        this.menuConfigTwo = { ...this.menuConfig };
        this.menuConfigTwo.items = [{
            label: '',
            icon: 'fas fa-star'
        },
        {
            label: 'Without icon',
            icon: ''
        }];

        this.menuConfigThree = { ...this.menuConfig };
        this.menuConfigThree.items = [{
            label: 'Photos/Videos',
            icon: 'fas fa-star'
        },
        {
            label: 'User Reviews',
            icon: 'fas fa-user-friends',
            delimeter: true
        },
        {
            label: 'Subscription',
            icon: 'fas fa-newspaper'
        }];
    }

    onSelect(item: any) {
        alert('Cliciked: ' + item.label)
    }
}