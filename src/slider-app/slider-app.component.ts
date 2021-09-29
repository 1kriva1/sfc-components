import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'slider-app',
    templateUrl: './slider-app.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class SliderAppComponent extends BaseAppComponent {

    config = {
        items: [
            { title: 'title 1', subTitle: 'sub-title 1', imgSrc: '../assets/belgium_eden_hazard.png' },
            { title: 'title 2', subTitle: 'sub-title 2', imgSrc: '../assets/barack-obama.png' },
            { title: 'title 3', subTitle: 'sub-title 3', imgSrc: '../assets/defaultImage.png' },
            { title: 'title 1', subTitle: 'sub-title 1', imgSrc: '../assets/belgium_eden_hazard.png' },
            { title: 'title 2', subTitle: 'sub-title 2', imgSrc: '../assets/barack-obama.png' },
            { title: 'title 3', subTitle: 'sub-title 3', imgSrc: '../assets/defaultImage.png' }
        ]
    }

    configAutomatic;
    configShowCount;
    configShowPagination;
    configFull;
    configSize;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);
        this.configAutomatic = { ...this.config };
        this.configAutomatic.movementType = 'automatic';

        this.configShowCount = { ...this.config };
        this.configShowCount.showCount = true;

        this.configShowPagination = { ...this.config };
        this.configShowPagination.showPagination = true;

        this.configFull = { ...this.config };
        this.configFull.showPagination = true;
        this.configFull.showCount = true;
        this.configFull.movementType = 'automatic';

        this.configSize = { ...this.config };
        this.configSize.showPagination = true;
        this.configSize.showCount = true;
        this.configSize.movementType = 'automatic';
        this.configSize.customSize = { width: 1300, height: 700 };
    }
}