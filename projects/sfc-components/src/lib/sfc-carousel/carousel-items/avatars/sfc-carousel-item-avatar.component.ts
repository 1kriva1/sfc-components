import { Component, Input } from '@angular/core';
import SfcCarouselItemBaseComponent from '../base/sfc-carousel-item-base.component';
import ICarouselAvatarItem from '../../../common/interfaces/sfc-carousel/items/ICarouselAvatarItem';

@Component({
    selector: 'sfc-carousel-item-avatar',
    templateUrl: './sfc-carousel-item-avatar.component.html',
    styleUrls: ['../base/sfc-carousel-item-base.component.css', './sfc-carousel-item-avatar.component.css']
})
export class SfcCarouselItemAvatarComponent extends SfcCarouselItemBaseComponent {

    @Input()
    item: ICarouselAvatarItem;
}