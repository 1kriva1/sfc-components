import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'notification-app',
    templateUrl: './notification-app.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class NotificationAppComponent extends BaseAppComponent {

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);

    }

    onCloseNotification() {
        alert('On close notification');
    }

    onButtonClick() {
        alert('On button click');
    }
}