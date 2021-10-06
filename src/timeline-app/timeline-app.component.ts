import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'timeline-app',
    templateUrl: './timeline-app.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class TimeLineAppComponent extends BaseAppComponent {

    configFirstHalfOnly = {
        items: [
            { title: 'First half', isPeriod: true },
            { title: 'Fernando Torres', position: 'left', description: 'Assist - Steven Gerrard', dateTimeLabel: "11'", icon: 'fas fa-futbol' },
            { title: 'Diedie Drogba', position: 'right', description: 'Assist - Frank Lampard', dateTimeLabel: "23'", icon: 'fas fa-futbol' },
            { title: 'Xabi Alonso', position: 'left', description: 'Dirty game', dateTimeLabel: "24'", imgSrc: '../assets/yellow.png' },
            { title: 'Xabi Alonso', position: 'left', description: 'Yelling on referee', dateTimeLabel: "44'", imgSrc: '../assets/red.png' },
            { title: 'Second half', isPeriod: true }
        ]
    };

    configSecondHalfOnly = {
        items: [
            { title: 'First half', isPeriod: true },
            { title: 'Second half', isPeriod: true },
            { title: 'John Terry', position: 'right', description: 'Assist - Frank Lampard', dateTimeLabel: "83'", icon: 'fas fa-futbol' }
        ]
    };

    configNothingHappened = {
        items: [
            { title: 'First half', isPeriod: true },
            { title: 'Second half', isPeriod: true }
        ]
    };

    configEmpty = {
        items: []
    };

    config = {
        items: [
            { title: 'First half', isPeriod: true },
            { title: 'Fernando Torres', position: 'left', description: 'Assist - Steven Gerrard', dateTimeLabel: "11'", icon: 'fas fa-futbol' },
            { title: 'Diedie Drogba', position: 'right', description: 'Assist - Frank Lampard', dateTimeLabel: "23'", icon: 'fas fa-futbol' },
            { title: 'Xabi Alonso', position: 'left', description: 'Dirty game', dateTimeLabel: "24'", imgSrc: '../assets/yellow.png' },
            { title: 'Xabi Alonso', position: 'left', description: 'Yelling on referee', dateTimeLabel: "44'", imgSrc: '../assets/red.png' },
            { title: 'Second half', isPeriod: true },
            { title: 'John Terry', position: 'right', description: 'Assist - Frank Lampard', dateTimeLabel: "83'", icon: 'fas fa-futbol' }
        ]
    };

    configFull = {
        items: [
            { title: 'First half', isPeriod: true },
            { title: 'Fernando Torres', position: 'left', description: 'Assist - Steven Gerrard', dateTimeLabel: "11'", icon: 'fas fa-futbol' },
            { title: 'Diedie Drogba', position: 'right', description: 'Assist - Frank Lampard', dateTimeLabel: "23'", icon: 'fas fa-futbol' },
            { title: 'Diedie Drogba', position: 'right', description: 'Throw T-Shirt', dateTimeLabel: "23'", imgSrc: '../assets/yellow.png' },            
            { title: 'Xabi Alonso', position: 'left', description: 'Dirty game', dateTimeLabel: "24'", imgSrc: '../assets/yellow.png' },
            { title: 'Joe Cole', position: 'right', description: 'Penalty', dateTimeLabel: "43'", icon: 'fas fa-futbol' },
            { title: 'Xabi Alonso', position: 'left', description: 'Yelling on referee', dateTimeLabel: "44'", imgSrc: '../assets/red.png' },
            { title: 'Second half', isPeriod: true },
            { title: 'Steven Gerrard', position: 'left', description: '', dateTimeLabel: "54'", icon: 'fas fa-futbol' },
            { title: 'John Terry', position: 'right', description: 'Assist - Frank Lampard', dateTimeLabel: "83'", icon: 'fas fa-futbol' },
            { title: 'Dirk Kuyt', position: 'left', description: 'Assist - Riise', dateTimeLabel: "90'+4", icon: 'fas fa-futbol' }
        ]
    };

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);
    }
}