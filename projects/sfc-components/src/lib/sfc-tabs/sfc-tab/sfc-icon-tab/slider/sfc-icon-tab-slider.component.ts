import { Component, Input } from '@angular/core';

@Component({
    selector: 'sfc-icon-tab-slider',
    templateUrl: './sfc-icon-tab-slider.component.html',
    styleUrls: ['./sfc-icon-tab-slider.component.css']
})
export class SfcIconTabSliderComponent {

    @Input()
    length: number;

    @Input('selected-index')
    selectedIndex: number;

    get width(): string {
        return `calc(100% / ${this.length} )`;
    }

    get transform(): string {
        return `translateX(${100 * this.selectedIndex}%)`;
    }
}