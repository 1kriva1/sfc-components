import { TestBed, ComponentFixture, async, fakeAsync, tick, flush, discardPeriodicTasks } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcCarouselComponent } from './sfc-carousel.component';
import { By } from '@angular/platform-browser';
import { SfcComponentsModule } from '../../sfc-components.module';
import { ButtonType, CommonConstants, ComponentMovementType, ComponentSize, PositionType } from '../../common/constants/common-constants';
import { SfcCarouselItemDefaultComponent } from '../carousel-items/default/sfc-carousel-item-default.component';
import { SfcCarouselItemAvatarComponent } from '../carousel-items/avatars/sfc-carousel-item-avatar.component';

describe('Component: SfcCarouselComponent', () => {

    let component: SfcCarouselComponent;
    let fixture: ComponentFixture<SfcCarouselComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcCarouselComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcCarouselComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Main elements: should exist", async(() => {
        expect(fixture.nativeElement.querySelector('div.carousel-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.carousel')).toBeDefined();
    }));

    it("Action buttons: exist by default", async(() => {
        expect(fixture.nativeElement.querySelector('div.action-buttons')).toBeDefined();
    }));

    it("Action buttons: not exist if automatic mode", async(() => {
        spyOn(window, 'setInterval').and.callFake(() => null);
        component.config = { movementType: ComponentMovementType.Automatic, items: [], itemType: SfcCarouselItemDefaultComponent };
        component.ngAfterViewInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.action-buttons')).toBeNull();
    }));

    it("Action buttons: exist if not defined in config", async(() => {
        spyOn(window, 'setInterval').and.callFake(() => null);
        component.config = { items: [], itemType: SfcCarouselItemDefaultComponent };
        component.ngAfterViewInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.action-buttons')).toBeDefined();
    }));

    it("Action buttons: should exist two", async(() => {
        expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(2);
    }));

    it("Action buttons: base attributes", async(() => {
        const actionButtons = el.queryAll(By.css('sfc-button'));

        actionButtons.forEach(btn => {
            expect(btn.attributes['text']).toEqual('');
            expect(btn.attributes['size']).toEqual(ComponentSize.Small);
            expect(btn.attributes['ng-reflect-types']).toEqual(ButtonType.Circled);
            expect(btn.attributes['ng-reflect-disabled']).toEqual('false');
            expect(btn.componentInstance.customSize).toEqual(component.buttonsSize);
        });
    }));

    it("Left/Up action button: attributes", async(() => {
        const upActionButton = el.queryAll(By.css('sfc-button'))[0];

        expect(upActionButton.attributes['ng-reflect-icon-before']).toEqual('fa fa-chevron-left');

        component.config = { positionType: PositionType.Vertical, items: [], itemType: SfcCarouselItemDefaultComponent };
        fixture.detectChanges();

        expect(upActionButton.attributes['ng-reflect-icon-before']).toEqual('fa fa-chevron-up');
    }));

    it("Right/Down action button: attributes", async(() => {
        const downActionButton = el.queryAll(By.css('sfc-button'))[1];

        expect(downActionButton.attributes['ng-reflect-icon-before']).toEqual('fa fa-chevron-right');

        component.config = { positionType: PositionType.Vertical, items: [], itemType: SfcCarouselItemDefaultComponent };
        fixture.detectChanges();

        expect(downActionButton.attributes['ng-reflect-icon-before']).toEqual('fa fa-chevron-down');
    }));

    it("Action buttons: disabled on move", fakeAsync(() => {
        const actionButtons = el.queryAll(By.css('sfc-button'));

        actionButtons.forEach(btn => {
            clickActionBtn(btn);

            expect(btn.attributes['ng-reflect-disabled']).toEqual('true');

            tick(CommonConstants.CAROUSEL_DELAY_MS);
            fixture.detectChanges();

            expect(btn.attributes['ng-reflect-disabled']).toEqual('false');
        });
    }));

    it("Action buttons: size values", fakeAsync(() => {
        component.config = { size: ComponentSize.Small, items: [], itemType: SfcCarouselItemDefaultComponent };
        fixture.detectChanges();

        const actionButtons = el.queryAll(By.css('sfc-button'));

        actionButtons.forEach(btn => {
            expect(btn.componentInstance.customSize).toEqual({ width: 25, height: 25 });
        });

        component.config.size = ComponentSize.Medium;
        fixture.detectChanges();

        actionButtons.forEach(btn => {
            expect(btn.componentInstance.customSize).toEqual({ width: 35, height: 35 });
        });

        component.config.size = ComponentSize.Large;
        fixture.detectChanges();

        actionButtons.forEach(btn => {
            expect(btn.componentInstance.customSize).toEqual({ width: 40, height: 40 });
        });
    }));

    it("Left/Up action button: on click event (indexes)", async(() => {
        const upActionButton = el.queryAll(By.css('sfc-button'))[0];

        clickActionBtn(upActionButton);

        expect(component.currentIndex).toEqual(3);
        expect(component.previousIndex).toEqual(2);

        clickActionBtn(upActionButton);

        expect(component.currentIndex).toEqual(1);
        expect(component.previousIndex).toEqual(3);
    }));

    it("Right/Down action button: on click event (indexes)", async(() => {
        const downActionButton = el.queryAll(By.css('sfc-button'))[1];

        clickActionBtn(downActionButton);

        expect(component.currentIndex).toEqual(1);
        expect(component.previousIndex).toEqual(2);

        clickActionBtn(downActionButton);

        expect(component.currentIndex).toEqual(3);
        expect(component.previousIndex).toEqual(1);
    }));

    it("Carousel: size values", async(() => {
        component.config = { positionType: PositionType.Horizontal, items: [], itemType: SfcCarouselItemDefaultComponent };
        fixture.detectChanges();

        const carouselEl = fixture.nativeElement.querySelector('div.carousel');

        expect(carouselEl.style.width).toEqual(component.componentSize.width);
        expect(carouselEl.style.height).toEqual(component.componentSize.height);

        component.config = { positionType: PositionType.Vertical, items: [], itemType: SfcCarouselItemDefaultComponent };
        fixture.detectChanges();

        expect(carouselEl.style.width).toEqual(component.componentSize.width);
        expect(carouselEl.style.height).toEqual(component.componentSize.height);
    }));

    it("Carousel: automatic mode", fakeAsync(() => {
        spyOn<any>(component, 'move').and.callThrough();
        spyOn(window, 'setInterval').and.callThrough();
        component.config = { movementType: ComponentMovementType.Automatic, items: [], itemType: SfcCarouselItemDefaultComponent };
        component.ngAfterViewInit();
        fixture.detectChanges();

        tick(1000);

        expect(component['move']).not.toHaveBeenCalled();

        tick(500);

        expect(component['move']).toHaveBeenCalledTimes(1);
        expect(component['move']).toHaveBeenCalledWith(true);

        flush();
        discardPeriodicTasks();
    }));

    it("Carousel: automatic mode (several rounds)", fakeAsync(() => {
        spyOn<any>(component, 'move').and.callThrough();
        spyOn(window, 'setInterval').and.callThrough();
        component.config = { movementType: ComponentMovementType.Automatic, items: [], itemType: SfcCarouselItemDefaultComponent };
        component.ngAfterViewInit();
        fixture.detectChanges();

        tick(CommonConstants.CAROUSEL_AUTOMATIC_PERIOD_MS);

        expect(component['move']).toHaveBeenCalledTimes(1);

        tick(CommonConstants.CAROUSEL_AUTOMATIC_PERIOD_MS * 3);

        expect(component['move']).toHaveBeenCalledTimes(4);

        flush();
        discardPeriodicTasks();
    }));

    it("Carousel items: default count", async(() => {
        component.config = { items: [], itemType: SfcCarouselItemDefaultComponent };
        component.itemsContainer.clear();
        component.ngAfterViewInit();
        fixture.detectChanges();

        expect(el.queryAll(By.css('sfc-carousel-item-default')).length).toEqual(CommonConstants.CAROUSEL_DEFAULT_COUNT);
    }));

    it("Carousel items: less than CAROUSEL_DEFAULT_COUNT", async(() => {
        component.config = { items: [{}], itemType: SfcCarouselItemDefaultComponent };
        component.itemsContainer.clear();
        component.ngAfterViewInit();
        fixture.detectChanges();

        expect(el.queryAll(By.css('sfc-carousel-item-default')).length).toEqual(CommonConstants.CAROUSEL_DEFAULT_COUNT);
    }));

    it("Carousel items: more than CAROUSEL_DEFAULT_COUNT", async(() => {
        component.config = { items: [{}, {}, {}, {}], itemType: SfcCarouselItemDefaultComponent };
        component.itemsContainer.clear();
        component.ngAfterViewInit();
        fixture.detectChanges();

        expect(el.queryAll(By.css('sfc-carousel-item-default')).length).toEqual(CommonConstants.CAROUSEL_DEFAULT_COUNT);
    }));

    it("Carousel items: when click action button", async(() => {
        const itemsEls = el.queryAll(By.css('sfc-carousel-item-default'));

        expect(itemsEls.length).toEqual(CommonConstants.CAROUSEL_DEFAULT_COUNT);

        const downActionButton = el.queryAll(By.css('sfc-button'))[1];
        clickActionBtn(downActionButton);

        const afterMoveItemsEls = el.queryAll(By.css('sfc-carousel-item-default'));

        expect(afterMoveItemsEls.length).toEqual(4);
    }));

    it("Carousel items: indexes updated after move", async(() => {
        let itemEls = el.queryAll(By.css('sfc-carousel-item-default'));

        itemEls.forEach((item) => {
            expect(item.componentInstance.currentIndex).toEqual(component.currentIndex);
            expect(item.componentInstance.previousIndex).toEqual(component.previousIndex);
        });

        clickActionBtn(el.queryAll(By.css('sfc-button'))[1]);
        
        itemEls.forEach((item) => {
            expect(item.componentInstance.currentIndex).toEqual(component.currentIndex);
            expect(item.componentInstance.previousIndex).toEqual(component.previousIndex);
        });        
    }));


    it("Position: default", async(() => {
        expect(el.nativeElement.className).toContain(PositionType.Horizontal);
    }));

    it("Position: without value in config", async(() => {
        component.config = { items: [], itemType: SfcCarouselItemDefaultComponent };
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.nativeElement.className).toContain(PositionType.Horizontal);
    }));

    it("Position: with value in config", async(() => {
        component.config = { positionType: PositionType.Horizontal, items: [], itemType: SfcCarouselItemDefaultComponent };
        component.ngOnInit();
        fixture.detectChanges();

        expect(el.nativeElement.className).toContain(component.config.positionType);
    }));

    it("Count property: value", async(() => {
        const itemsEl = el.queryAll(By.css('sfc-carousel-item-default'));

        itemsEl.forEach(item => {
            expect(item.componentInstance.count).toEqual(component.count - 1);
        });
    }));

    it("Size property: default value", async(() => {
        const itemsEl = el.queryAll(By.css('sfc-carousel-item-default'));

        itemsEl.forEach(item => {
            expect(item.componentInstance.size).toEqual(ComponentSize.Medium);
        });
    }));

    it("Size property: when not defined value in config", async(() => {
        component.config = { items: [], itemType: SfcCarouselItemDefaultComponent };
        component.ngOnInit();
        component.itemsContainer.clear();
        component.ngAfterViewInit();
        fixture.detectChanges();

        const itemsEl = el.queryAll(By.css('sfc-carousel-item-default'));

        itemsEl.forEach(item => {
            expect(item.componentInstance.size).toEqual(ComponentSize.Medium);
        });
    }));

    it("Size property: when value defined in config", async(() => {
        component.config = { size: ComponentSize.Large, items: [], itemType: SfcCarouselItemDefaultComponent };
        component.ngOnInit();
        component.itemsContainer.clear();
        component.ngAfterViewInit();
        fixture.detectChanges();

        const itemsEl = el.queryAll(By.css('sfc-carousel-item-default'));

        itemsEl.forEach(item => {
            expect(item.componentInstance.size).toEqual(ComponentSize.Large);
        });
    }));

    it("Carousel item: default type", async(() => {
        expect(el.queryAll(By.css('sfc-carousel-item-default')).length > 0).toBeTruthy();
        expect(el.queryAll(By.css('sfc-carousel-item-avatar')).length > 0).toBeFalsy();
    }));

    it("Carousel item: custom type", async(() => {
        component.config = { items: [], itemType: SfcCarouselItemAvatarComponent };
        component.ngOnInit();
        component.itemsContainer.clear();
        component.ngAfterViewInit();
        fixture.detectChanges();

        expect(el.queryAll(By.css('sfc-carousel-item-default')).length > 0).toBeFalsy();
        expect(el.queryAll(By.css('sfc-carousel-item-avatar')).length > 0).toBeTruthy();
    }));

    it("Carousel item: main properties by default", async(() => {
        const itemsEl = el.queryAll(By.css('sfc-carousel-item-default'));

        for (let index = 1; index < itemsEl.length; index++) {
            const item = itemsEl[index - 1];
            expect(item.componentInstance.index).toEqual(index);
            expect(item.componentInstance.currentIndex).toEqual(component.currentIndex);
            expect(item.componentInstance.previousIndex).toEqual(component.previousIndex);
            expect(item.componentInstance.state).toEqual({ created: false, hidden: false, removed: false });
            expect(item.componentInstance.type).toEqual(component.config.positionType);
            expect(item.componentInstance.item).toBeUndefined()
        }
    }));

    it("Carousel item: created property", fakeAsync(() => {
        const downActionButton = el.queryAll(By.css('sfc-button'))[1];

        clickActionBtn(downActionButton);

        const newItemEl = el.queryAll(By.css('sfc-carousel-item-default'))[3];

        expect(newItemEl.componentInstance.state.created).toBeTruthy();

        tick(CommonConstants.CAROUSEL_DELAY_MS);

        expect(newItemEl.componentInstance.state.created).toBeFalsy();
    }));

    it("Carousel item: removed property (move down)", async(() => {
        const downActionButton = el.queryAll(By.css('sfc-button'))[1];

        clickActionBtn(downActionButton);

        const itemEls = el.queryAll(By.css('sfc-carousel-item-default'));

        expect(itemEls[2].componentInstance.state.removed).toBeTruthy();
        expect(itemEls[0].componentInstance.state.removed).toBeFalsy();
    }));

    it("Carousel item: removed property (move up)", async(() => {
        const upActionButton = el.queryAll(By.css('sfc-button'))[0];

        clickActionBtn(upActionButton);

        const itemEls = el.queryAll(By.css('sfc-carousel-item-default'));

        expect(itemEls[2].componentInstance.state.removed).toBeFalsy();
        expect(itemEls[0].componentInstance.state.removed).toBeTruthy();
    }));

    it("Carousel item: after move actions", fakeAsync(() => {
        clickActionBtn(el.queryAll(By.css('sfc-button'))[1]);        

        let itemEls = el.queryAll(By.css('sfc-carousel-item-default'));
        
        expect(itemEls.length).toEqual(4);

        tick(CommonConstants.CAROUSEL_DELAY_MS);

        let afterMoveItemsEls = el.queryAll(By.css('sfc-carousel-item-default'));

        expect(afterMoveItemsEls.length).toEqual(CommonConstants.CAROUSEL_DEFAULT_COUNT);

        clickActionBtn(el.queryAll(By.css('sfc-button'))[0]);

        itemEls = el.queryAll(By.css('sfc-carousel-item-default'));
        
        expect(itemEls.length).toEqual(4);

        tick(CommonConstants.CAROUSEL_DELAY_MS);

        afterMoveItemsEls = el.queryAll(By.css('sfc-carousel-item-default'));

        expect(afterMoveItemsEls.length).toEqual(CommonConstants.CAROUSEL_DEFAULT_COUNT);
    }));

    it("Carousel item: index property (move down)", fakeAsync(() => {
        const downActionButton = el.queryAll(By.css('sfc-button'))[1];

        clickActionBtn(downActionButton);        

        tick(CommonConstants.CAROUSEL_DELAY_MS);

        let itemEls = el.queryAll(By.css('sfc-carousel-item-default'));

        expect(itemEls[2].componentInstance.index).toEqual(3);

        clickActionBtn(downActionButton);

        tick(CommonConstants.CAROUSEL_DELAY_MS);

        itemEls = el.queryAll(By.css('sfc-carousel-item-default'));

        expect(itemEls[2].componentInstance.index).toEqual(2);
    }));

    it("Carousel item: index property (move up)", fakeAsync(() => {
        const upActionButton = el.queryAll(By.css('sfc-button'))[0];

        clickActionBtn(upActionButton);        

        tick(CommonConstants.CAROUSEL_DELAY_MS);

        let itemEls = el.queryAll(By.css('sfc-carousel-item-default'));

        expect(itemEls[2].componentInstance.index).toEqual(1);

        clickActionBtn(upActionButton);

        tick(CommonConstants.CAROUSEL_DELAY_MS);

        itemEls = el.queryAll(By.css('sfc-carousel-item-default'));

        expect(itemEls[2].componentInstance.index).toEqual(2);
    }));
    
    function clickActionBtn(btn: DebugElement) {
        const buttonEl = btn.query(By.css('a.sfc-button'));
        buttonEl.triggerEventHandler('click', { target: buttonEl.nativeElement });
        fixture.detectChanges();
    }
});

