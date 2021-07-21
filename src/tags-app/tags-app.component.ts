import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'tags-app',
    templateUrl: './tags-app.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class TagsAppComponent extends BaseAppComponent {

    tags = [
        {label: 'tag 1'},
        {label: 'Card & Board Game', icon: 'fa fa-car'},
        {label: 'tag 3', icon: 'fa fa-car', size:'small'},
        {label: 'tag 4', icon: 'fa fa-car', size:'medium'},
        {label: 'tag 5', icon: 'fa fa-car', size:'large'},
        {label: 'tag 6', icon: 'fa fa-car', customSize: 29},
        {label: 'tag 7', icon: 'fa fa-car', customSize: 5}
    ]

    tagsSame = [
        {label: 'tag 1'},
        {label: 'Card & Board Game'},
        {label: 'tag 3', icon: 'fa fa-car'},
        {label: 'tag 4', icon: 'fa fa-car'},
        {label: 'tag 5', icon: 'fa fa-car'},
        {label: 'tag 6', icon: 'fa fa-car'},
        {label: 'English', icon: 'fa fa-car'}
    ]

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);
    }    
}