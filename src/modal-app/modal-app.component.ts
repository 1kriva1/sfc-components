import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'modal-app',
    templateUrl: './modal-app.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class ModalAppComponent extends BaseAppComponent {

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);
    }

    ngOnInit() {
        
    }
}