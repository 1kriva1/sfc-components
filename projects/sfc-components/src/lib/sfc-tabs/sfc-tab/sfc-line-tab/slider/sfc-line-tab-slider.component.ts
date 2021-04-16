import { Component, Input } from '@angular/core';

@Component({
    selector: 'sfc-line-tab-slider',
    templateUrl: './sfc-line-tab-slider.component.html',
    styleUrls: ['./sfc-line-tab-slider.component.css']
})
export class SfcLineTabSliderComponent {

    @Input()
    length: number;

    @Input('selected-index')
    selectedIndex: number;

    get width(): string {
        return `calc(100% / ${this.length} )`;
    }

    get left(): string {
        return `calc((100% / ${this.length}) * ${this.selectedIndex} )`;
    }
}