import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, HostBinding, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CarouselMovementType, PositionType, CommonConstants, ComponentSize } from '../common/constants/common-constants';
import ISize from '../common/interfaces/ISize';
import ICarouselConfig from '../common/interfaces/sfc-carousel/ICarouselConfig';
import { CollectionUtils } from '../common/utils/collection-utils';
import { CommonUtils } from '../common/utils/common-utils';
import { UIUtils } from '../common/utils/ui-utils';
import { SfcCarouselItemDefaultComponent } from './carousel-items/default/sfc-carousel-item-default.component';


@Component({
    selector: 'sfc-carousel',
    templateUrl: './sfc-carousel.component.html',
    styleUrls: ['./sfc-carousel.component.css']
})
export class SfcCarouselComponent implements OnInit, AfterViewInit, AfterViewChecked {

    @Input()
    config: ICarouselConfig;

    @ViewChild('itemsContainer', { read: ViewContainerRef, static: false })
    itemsContainer: ViewContainerRef;

    // current (center) index of items 
    currentIndex: number = 2;

    // previous (center) index of items
    previousIndex: number = null;

    // carousel size depend on items sizes
    componentSize: any = {};

    //disable actions flag
    private actionDisabled = false;

    // show actions buttons when not automatic mode
    private showActionButtons = true;

    private itemsComponents: ComponentRef<any>[] = [];

    @HostBinding('class')
    get carouselType() {
        return this.config.positionType;
    }

    get count() {
        return this.config.items.length < CommonConstants.CAROUSEL_DEFAULT_COUNT ? CommonConstants.CAROUSEL_DEFAULT_COUNT : this.config.items.length;
    }

    get buttonsSize(): ISize {
        switch (this.config.size) {
            case ComponentSize.Small:
                return { width: 25, height: 25 };
            case ComponentSize.Medium:
                return { width: 35, height: 35 };
            case ComponentSize.Large:
                return { width: 40, height: 40 };
            default:
                return { width: 35, height: 35 };
        }
    }

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private changeDetector: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.config = CommonUtils.isDefined(this.config) ? this.config : {
            items: [],
            itemType: SfcCarouselItemDefaultComponent,
            positionType: PositionType.Horizontal,
            movementType: CarouselMovementType.Custom,
            size: ComponentSize.Medium
        };

        // by default component position is horizontal
        this.config.positionType = this.config.positionType || PositionType.Horizontal;

        // by default component is not moved automatically
        this.config.movementType = this.config.movementType || CarouselMovementType.Custom;

        this.config.size = this.config.size || ComponentSize.Medium;
    }

    ngAfterViewInit(): void {
        // add items to carousel
        this.setUpInitialItems();

        // set component size depend on carousel items
        this.setUpComponentSize();

        if (this.config.movementType == CarouselMovementType.Automatic) {
            this.setUpAutomaticMode();
        }
    }

    ngAfterViewChecked() {
        this.changeDetector.detectChanges();
    }

    setUpInitialItems() {
        // clear items
        this.itemsComponents = [];

        for (let itemId = 1; itemId <= CommonConstants.CAROUSEL_DEFAULT_COUNT; itemId++) {
            // const index = this.config.items.length < itemId ? null : itemId;
            this.createNewItem(itemId);
        }
    }

    setUpComponentSize() {
        if (this.config.positionType == PositionType.Vertical) {
            this.componentSize = {
                width: UIUtils.getCssLikePx(+CollectionUtils.max(this.itemsComponents, item => item.instance.itemSize.width).toFixed(0)),
                height: UIUtils.getCssLikePx(+(this.itemsComponents[1].instance.itemSize.height * CommonConstants.CAROUSEL_DEFAULT_COUNT).toFixed(0))
            };
        } else {
            this.componentSize = {
                width: UIUtils.getCssLikePx(+(this.itemsComponents[1].instance.itemSize.width * CommonConstants.CAROUSEL_DEFAULT_COUNT).toFixed(0)),
                height: UIUtils.getCssLikePx(+CollectionUtils.max(this.itemsComponents, item => item.instance.itemSize.height).toFixed(0))
            };
        }
    }

    setUpAutomaticMode() {
        this.showActionButtons = false;
        setInterval(() => this.move(true), CommonConstants.CAROUSEL_AUTOMATIC_PERIOD_MS);
    }

    disableActions() {
        this.actionDisabled = true;
        setTimeout(() => this.actionDisabled = false, CommonConstants.CAROUSEL_DELAY_MS);
    }

    createNewItem(index: number, created: boolean = false, isMoveDown: boolean = false) {
        const itemComponent = this.componentFactoryResolver.resolveComponentFactory(this.config.itemType);

        let newItem = this.itemsContainer.createComponent(itemComponent);
        newItem.instance.index = index;
        newItem.instance.count = this.count - 1;
        newItem.instance.currentIndex = this.currentIndex;
        newItem.instance.previousIndex = this.previousIndex;
        newItem.instance.state = { created: created, hidden: !CommonUtils.isDefined(index) || this.isNextItemHidden(index), removed: false };
        newItem.instance.item = this.config.items[index - 1];
        newItem.instance.type = this.config.positionType;
        newItem.instance.size = this.config.size;

        if (created) {
            setTimeout(() => newItem.instance.state.created = false, CommonConstants.CAROUSEL_DELAY_MS);
        }

        newItem.changeDetectorRef.detectChanges();

        if (isMoveDown)
            this.itemsComponents.unshift(newItem);
        else
            this.itemsComponents.push(newItem);
    }

    move(isMovedDown: boolean) {
        this.disableActions();

        this.setIndexes(isMovedDown);

        this.destroyMovedItem(isMovedDown);

        this.updateItems();

        this.createNewItem(this.getNextIndex(isMovedDown), true, isMovedDown);
    }

    destroyMovedItem(isMovedDown: boolean) {
        if (isMovedDown)
            CollectionUtils.lastItem(this.itemsComponents).instance.state.removed = true;
        else
            CollectionUtils.firstItem(this.itemsComponents).instance.state.removed = true;

        setTimeout(() => {
            if (isMovedDown) {
                CollectionUtils.lastItem(this.itemsComponents).destroy();
                this.itemsComponents.pop();
            } else {
                CollectionUtils.firstItem(this.itemsComponents).destroy();
                this.itemsComponents.shift();
            }
        }, CommonConstants.CAROUSEL_DELAY_MS);
    }

    updateItems() {
        this.itemsComponents.forEach(itemComponent => {
            if (!itemComponent.hostView.destroyed) {
                itemComponent.instance.currentIndex = this.currentIndex;
                itemComponent.instance.previousIndex = this.previousIndex;
                itemComponent.changeDetectorRef.detectChanges();
            }
        });
    }

    setIndexes(isMovedDown: boolean) {
        this.previousIndex = this.currentIndex;

        if (isMovedDown) {
            this.currentIndex -= 1;

            if (this.currentIndex < 1)
                this.currentIndex = this.count;
        } else {
            this.currentIndex += 1;

            if (this.currentIndex > this.count)
                this.currentIndex = 1;
        }
    }

    getNextIndex(isMovedDown: boolean) {
        if (isMovedDown)
            return this.currentIndex == 1 ? this.count : this.currentIndex - 1;
        else
            return this.currentIndex >= this.count ? 1 : this.currentIndex + 1;
    }

    isNextItemHidden(nextIndex: number) {
        return this.count != this.config.items.length && ((this.config.items.length == 1 && (nextIndex == 2 || nextIndex == CommonConstants.CAROUSEL_DEFAULT_COUNT))
            || (this.config.items.length == 2 && nextIndex == CommonConstants.CAROUSEL_DEFAULT_COUNT))
    }
}