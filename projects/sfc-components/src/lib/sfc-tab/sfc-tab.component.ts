import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
    selector: 'sfc-tab',
    templateUrl: './sfc-tab.component.html',
    styleUrls: ['./sfc-tab.component.css']
})
export class SfcTabComponent implements OnInit {

    @Input()
    title: string;

    @Input()
    selected = false;

    constructor() {
    }

    ngOnInit() {


    }



}