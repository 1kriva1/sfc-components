import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SfcModalComponent } from 'projects/sfc-components/src/lib/sfc-modal/sfc-modal.component';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'modal-app',
    templateUrl: './modal-app.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class ModalAppComponent extends BaseAppComponent {

    @ViewChild('defaultModalFooterConfigCancelClick', { static: false })
    modal: SfcModalComponent;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);
    }

    onCancelClick = (() => {
        alert('On Cancel click from default footer');
        this.modal.close();
    }).bind(this);
}