import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'tab-app',
    templateUrl: './tab-app.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class TabAppComponent extends BaseAppComponent {

    private selectedId: string;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);
    }

    onSelectTab(id: string){
        this.selectedId = id;
        console.log("Tab id: " + id);
    }
}