import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'projects/sfc-components/src/lib/common/interfaces/sfc-carousel/sfc-owl-carousel/owl-options.model';
import { SlidesOutputData } from 'projects/sfc-components/src/lib/common/interfaces/sfc-carousel/sfc-owl-carousel/slides-output-data.model';
import { SfcSchemeComponent } from 'projects/sfc-components/src/lib/sfc-scheme/sfc-scheme.component';
import BaseAppComponent from 'src/base-app.component';



@Component({
    selector: 'scheme-app',
    templateUrl: './scheme-app.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class SchemeAppComponent extends BaseAppComponent {

    formations = [
        { id: 1, formation: [3, 4, 1] },
        { id: 2, formation: [3, 4, 2] },
        { id: 3, formation: [3, 4, 3] },
        { id: 4, formation: [3, 4, 4] },
        { id: 5, formation: [2, 3, 5] },
        { id: 6, formation: [1, 6, 3] }
    ];

    formationId = 1;

    playerFormations = [
        [{ data: { firstName: 'Andrii', lastName: 'Kryvoruk', photo: '../assets/barack-obama.png', raiting: 78, position:'LW' } }, {}, {}],
        [{ data: { firstName: 'Andrii', lastName: 'Kryvoruk', photo: '../assets/defaultImage.png', raiting: 78, position:'L' } }, {}, {}, {}],
        [{}],
        [{ data: { firstName: 'Andrii', lastName: 'Kryvoruk', photo: '../assets/belgium_eden_hazard.png', raiting: 78, position:'GK' } }]
    ];

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);

    }

    getResult(value: any){
        alert(JSON.stringify(value));
    }

}
