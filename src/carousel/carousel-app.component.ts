import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SfcCarouselItemAvatarComponent } from 'projects/sfc-components/src/lib/sfc-carousel/carousel-items/avatars/sfc-carousel-item-avatar.component';
import { SfcCarouselItemDefaultComponent } from 'projects/sfc-components/src/lib/sfc-carousel/carousel-items/default/sfc-carousel-item-default.component';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'carousel-app',
    templateUrl: './carousel-app.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class CarouselAppComponent extends BaseAppComponent {

    avatarInfo = {
        rating: 71,
        firstName: 'Andrii',
        lastName: 'Kryvoruk',
        position: 'Goalkeeper',
        avatarSrc: '../assets/belgium_eden_hazard.png',
        isInjured: false,
        isCaptain: false
    }

    avatarInfo1 = {
        rating: 41,
        firstName: 'Barack',
        lastName: 'Obama',
        position: 'Defender',
        avatarSrc: '../assets/barack-obama.png',
        isInjured: true,
        isCaptain: true
    }

    carouselDefaultItemsConfig = {
        items: [
            { imgSrc: '../assets/belgium_eden_hazard.png', titleTop: 'Eden Hazard', labelTop: 'Midfielder', titleBottom: 'Real Madrid', labelBottom: 'Belgium' }
        ],
        itemType: SfcCarouselItemDefaultComponent
    }

    carouselAvatarConfig = {
        items: [
            { avatarInfo: this.avatarInfo, progress: 71, showStars: true, radius: 30 }
        ],
        itemType: SfcCarouselItemAvatarComponent
    }

    // default items
    carouselDefaultItemsTwoConfig;
    carouselDefaultItemsThreeConfig;
    carouselDefaultItemsFourConfig;
    carouselDefaultItemsAutomaticConfig;
    carouselDefaultItemsSmallConfig;
    carouselDefaultItemsMediumConfig;
    carouselDefaultItemsLargeConfig;
    carouselDefaultItemsSmallVerticalConfig;
    carouselDefaultItemsMediumVerticalConfig;
    carouselDefaultItemsLargeVerticalConfig;
    carouselDefaultItemsAutomaticVerticalConfig;

    // avatar items
    carouselAvatarItemsSmallConfig;
    carouselAvatarItemsMediumConfig;
    carouselAvatarItemsLargeConfig;
    carouselAvatarItemsAutomaticConfig;
    carouselAvatarItemsSmallVerticalConfig;
    carouselAvatarItemsMediumVerticalConfig;
    carouselAvatarItemsLargeVerticalConfig;
    carouselAvatarItemsAutomaticVerticalConfig;    

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);

        // default items
        this.carouselDefaultItemsTwoConfig = this.addNewItem(1);

        this.carouselDefaultItemsThreeConfig = this.addNewItem(2);

        this.carouselDefaultItemsFourConfig = this.addNewItem(3);

        this.carouselDefaultItemsAutomaticConfig = this.addNewItem(3);
        this.carouselDefaultItemsAutomaticConfig.movementType = 'automatic';

        this.carouselDefaultItemsSmallConfig = this.addNewItem(3);
        this.carouselDefaultItemsSmallConfig.size = 'small';

        this.carouselDefaultItemsMediumConfig = this.addNewItem(3);
        this.carouselDefaultItemsMediumConfig.size = 'medium';

        this.carouselDefaultItemsLargeConfig= this.addNewItem(3);
        this.carouselDefaultItemsLargeConfig.size = 'large';

        this.carouselDefaultItemsSmallVerticalConfig = this.addNewItem(3);
        this.carouselDefaultItemsSmallVerticalConfig.positionType = 'vertical';
        this.carouselDefaultItemsSmallVerticalConfig.size = 'small';

        this.carouselDefaultItemsMediumVerticalConfig = this.addNewItem(3);
        this.carouselDefaultItemsMediumVerticalConfig.positionType = 'vertical';
        this.carouselDefaultItemsMediumVerticalConfig.size = 'medium';

        this.carouselDefaultItemsLargeVerticalConfig= this.addNewItem(3);
        this.carouselDefaultItemsLargeVerticalConfig.positionType = 'vertical';
        this.carouselDefaultItemsLargeVerticalConfig.size = 'large';

        this.carouselDefaultItemsAutomaticVerticalConfig = this.addNewItem(3);
        this.carouselDefaultItemsAutomaticVerticalConfig.positionType = 'vertical';
        this.carouselDefaultItemsAutomaticVerticalConfig.movementType = 'automatic';

        // avatar items
        this.carouselAvatarItemsSmallConfig = this.addNewAvatarItem(3, 40);
        this.carouselAvatarItemsSmallConfig.size = 'small';

        this.carouselAvatarItemsMediumConfig = this.addNewAvatarItem(3, 50);
        this.carouselAvatarItemsMediumConfig.size = 'medium';

        this.carouselAvatarItemsLargeConfig= this.addNewAvatarItem(3, 60);
        this.carouselAvatarItemsLargeConfig.size = 'large';

        this.carouselAvatarItemsAutomaticConfig = this.addNewAvatarItem(3, 50);
        this.carouselAvatarItemsAutomaticConfig.movementType = 'automatic';

        this.carouselAvatarItemsSmallVerticalConfig = this.addNewAvatarItem(3, 40);
        this.carouselAvatarItemsSmallVerticalConfig.positionType = 'vertical';
        this.carouselAvatarItemsSmallVerticalConfig.size = 'small';

        this.carouselAvatarItemsMediumVerticalConfig = this.addNewAvatarItem(3, 50);
        this.carouselAvatarItemsMediumVerticalConfig.positionType = 'vertical';
        this.carouselAvatarItemsMediumVerticalConfig.size = 'medium';

        this.carouselAvatarItemsLargeVerticalConfig= this.addNewAvatarItem(3, 60);
        this.carouselAvatarItemsLargeVerticalConfig.positionType = 'vertical';
        this.carouselAvatarItemsLargeVerticalConfig.size = 'large';
        
        this.carouselAvatarItemsAutomaticVerticalConfig = this.addNewAvatarItem(3, 50);
        this.carouselAvatarItemsAutomaticVerticalConfig.positionType = 'vertical';
        this.carouselAvatarItemsAutomaticVerticalConfig.movementType = 'automatic';
    }

    addNewItem(count: number) {
        const defaultOneItem = [];
        this.carouselDefaultItemsConfig.items.forEach(val => defaultOneItem.push(Object.assign({}, val)));

        let newItem = { items: defaultOneItem, itemType: SfcCarouselItemDefaultComponent }

        for (let index = 0; index < count; index++) {
            if (index == 0)
                newItem.items.push({
                    imgSrc: '../assets/barack-obama.png', titleTop: 'Barack Obama', labelTop: 'President', titleBottom: 'Washington', labelBottom: 'USA'
                });
            else if (index == 1)
                newItem.items.push({
                    imgSrc: '../assets/defaultImage.png', titleTop: 'Robot', labelTop: 'default', titleBottom: 'Machine', labelBottom: 'UKRAINE'
                });
            else
                newItem.items.push({
                    imgSrc: '../assets/defaultImage.png', titleTop: `Robot ${index}`, labelTop: `default ${index}`, titleBottom: `Machine ${index}`, labelBottom: `Number ${index}`
                });
        }

        return newItem;
    }

    addNewAvatarItem(count: number, radius) {
        const defaultOneItem = [];
        this.carouselAvatarConfig.items[0].radius = radius;
        this.carouselAvatarConfig.items.forEach(val => defaultOneItem.push(Object.assign({}, val)));

        let newItem = { items: defaultOneItem, itemType: SfcCarouselItemAvatarComponent }

        for (let index = 0; index < count; index++) {
            if (index == 0)
                newItem.items.push({ avatarInfo: this.avatarInfo, progress: 71, showStars: true, radius: radius });
            else if (index == 1)
                newItem.items.push({ avatarInfo: this.avatarInfo1, progress: 41, showStars: true, radius: radius });
            else
                newItem.items.push({ avatarInfo: this.avatarInfo, progress: 71, showStars: true, radius: radius });
        }

        return newItem;
    }
}