import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sfc-progress-ring',
    templateUrl: './sfc-progress-ring.component.html',
    styleUrls: ['./sfc-progress-ring.component.css']
})
export class SfcProgressRingComponent implements OnInit {

    @Input()
    radius: number;

    @Input()
    stroke: number;

    @Input()
    progress: number;

    normalizedRadius: number;

    circumference: number;

    strokeDashoffset: number;

    

    ngOnInit(): void {
        this.normalizedRadius = this.radius - this.stroke * 2
        this.circumference = this.normalizedRadius * 2 * Math.PI;
        this.strokeDashoffset = this.circumference - (this.progress / 100 * this.circumference);
    }
}