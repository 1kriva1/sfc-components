import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISize } from 'selenium-webdriver';
import { CommonConstants, NotificationComponentType } from '../common/constants/common-constants';

@Component({
    selector: 'sfc-notification',
    templateUrl: './sfc-notification.component.html',
    styleUrls: ['./sfc-notification.component.css', './sfc-notification-dark-theme.component.css'],
    animations: [
        trigger(
            'closeAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('400ms', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                animate('400ms', style({ opacity: 0 }))
            ])
        ]
        )
    ]
})
export class SfcNotificationComponent implements OnInit {

    @Input('custom-size')
    customSize: ISize;

    @Input('show-close')
    showClose: boolean = true;

    @Input('show-button')
    showButton: boolean = true;

    @Input('auto-close')
    autoClose: boolean = false;

    @Input('destroy-interval')
    destroyInterval: number = CommonConstants.NOTIFICATION_DESTROY_INTERVAL_MS;

    @Input()
    type: NotificationComponentType = NotificationComponentType.Info;

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

    @Output('on-close')
    onClose: EventEmitter<void> = new EventEmitter<void>();

    @Output('on-button-click')
    onButtonClick: EventEmitter<void> = new EventEmitter<void>();

    show: boolean = true;

    ngOnInit(): void {
        if (this.autoClose)
            setInterval(() => this.show = false, CommonConstants.NOTIFICATION_DESTROY_INTERVAL_MS);
    }

    close() {
        this.show = false;

        if (this.onClose)
            this.onClose.emit();
    }

    onClick() {
        if (this.onButtonClick)
            this.onButtonClick.emit();
    }
}