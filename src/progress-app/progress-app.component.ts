import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'progress-app',
    templateUrl: './progress-app.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class ProgressAppComponent extends BaseAppComponent {

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);

    }

    getColor(value: number): string {
        if (value < 33) {
            return 'red';
        } else if (value >= 33 && value < 66) {
            return 'yellow';
        } else if (value >= 66 && value < 100) {
            return 'green';
        }
    }
}