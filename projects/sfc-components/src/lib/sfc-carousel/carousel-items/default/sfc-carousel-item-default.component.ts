import { Component, Input } from '@angular/core';
import ICarouselDefaultItem from '../../../common/interfaces/sfc-carousel/items/ICarouselDefaultItem';
import SfcCarouselItemBaseComponent from '../base/sfc-carousel-item-base.component';

@Component({
    selector: 'sfc-carousel-item-default',
    templateUrl: './sfc-carousel-item-default.component.html',
    styleUrls: ['../base/sfc-carousel-item-base.component.css', './sfc-carousel-item-default.component.css', './sfc-carousel-item-default-dark-theme.component.css']
})
export class SfcCarouselItemDefaultComponent extends SfcCarouselItemBaseComponent {
    
    @Input()
    item: ICarouselDefaultItem;
}