import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISize } from 'selenium-webdriver';
import { NotificationComponentType } from '../../common/constants/common-constants';
import { UIUtils } from '../../common/utils/ui-utils';

@Component({
    selector: 'sfc-notification-content',
    templateUrl: './sfc-notification-content.component.html',
    styleUrls: ['./sfc-notification-content.component.css']
})
export class SfcNotificationContentComponent {

    @Input()
    title: string;

    @Input('sub-title')
    subTitle: string;

    @Input('button-text')
    buttonText: string;

    @Input()
    icon: string;

    @Input('image-src')
    imgSrc: string;

    @Input()
    type: NotificationComponentType;

    @Input('custom-size')
    customSize: ISize;

    @Input('show-button')
    showButton: boolean = true;

    @Output('on-button-click')
    onButtonClick: EventEmitter<void> = new EventEmitter<void>();

    get iconClass() {
        const classes = {};

        if (this.icon) {
            // example: fa fa-star
            const iconParts = this.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        return classes;
    }

    get size() {
        return this.customSize ?
            {
                width: UIUtils.getCssLikePx(this.customSize.width),
                height: UIUtils.getCssLikePx(this.customSize.height)
            }
            : null;
    }

    onClick() {
        if (this.onButtonClick)
            this.onButtonClick.emit();
    }
}