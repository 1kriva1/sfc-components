import { TestBed, ComponentFixture, async, fakeAsync, tick, flush, discardPeriodicTasks } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcSliderComponent } from './sfc-slider.component';
import { SfcComponentsModule } from '../sfc-components.module';
import { CommonConstants, ComponentMovementType, StyleClass } from '../common/constants/common-constants';
import { By } from '@angular/platform-browser';

describe('Component: SfcSliderComponent', () => {

    let component: SfcSliderComponent;
    let fixture: ComponentFixture<SfcSliderComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcSliderComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcSliderComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcSliderComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.slider-wrapper')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.slider-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.slider-container > ul')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.btn.next')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.btn.prev')).toBeDefined();
    }));

    it("Wrapper: size default", async(() => {
        const wrapperEl = fixture.nativeElement.querySelector('div.slider-wrapper');

        expect(wrapperEl.offsetWidth).toEqual(600);
        expect(wrapperEl.offsetHeight).toEqual(400);
    }));

    it("Wrapper: size with custom value", async(() => {
        component.config = { items: [], customSize: { height: 700, width: 1300 } };
        fixture.detectChanges();

        const wrapperEl = fixture.nativeElement.querySelector('div.slider-wrapper');

        expect(wrapperEl.offsetWidth + 'px').toEqual(component.size.width);
        expect(wrapperEl.offsetHeight + 'px').toEqual(component.size.height);
    }));

    it("Container: not active state", async(() => {
        const containerEl = fixture.nativeElement.querySelector('div.slider-container');

        expect(containerEl.className).not.toContain(StyleClass.Active);
    }));

    it("Container: active state", async(() => {
        const containerEl = el.query(By.css('div.slider-container'));
        containerEl.triggerEventHandler('mouseover', { target: containerEl.nativeElement });
        fixture.detectChanges();

        expect(containerEl.nativeElement.className).toContain(StyleClass.Active);

        containerEl.triggerEventHandler('mouseout', { target: containerEl.nativeElement });
        fixture.detectChanges();

        expect(containerEl.nativeElement.className).not.toContain(StyleClass.Active);
    }));

    it("Items: default", async(() => {
        const itemElts = el.queryAll(By.css('sfc-slider-item'));

        expect(itemElts.length).toEqual(0);
    }));

    it("Items: custom value", async(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }] };
        fixture.detectChanges();

        const itemElts = el.queryAll(By.css('sfc-slider-item'));

        expect(itemElts.length).toEqual(component.config.items.length);
    }));

    it("Item: values", async(() => {
        component.config = { items: [{ imgSrc: '' }] };
        fixture.detectChanges();

        const itemEl = el.query(By.css('sfc-slider-item'));

        expect(itemEl.componentInstance.item).toEqual(component.config.items[0]);
        expect(itemEl.componentInstance.size).toBeUndefined();
    }));

    it("Item: custom size value", async(() => {
        component.config = { items: [{ imgSrc: '' }], customSize: { height: 700, width: 1300 } };
        fixture.detectChanges();

        const itemEl = el.query(By.css('sfc-slider-item'));

        expect(itemEl.componentInstance.size).toEqual(component.config.customSize);
    }));

    it("Slider: styles default", async(() => {
        const sliderEl = el.query(By.css('div.slider-container > ul'));

        expect(sliderEl.styles.width).toEqual('0px');
        expect(sliderEl.styles.left).toEqual('0px');
    }));

    it("Slider: styles with items", async(() => {
        component.config = { items: [{ imgSrc: '' }], customSize: { height: 700, width: 1300 } };
        fixture.detectChanges();

        const sliderEl = el.query(By.css('div.slider-container > ul'));

        expect(sliderEl.styles.width).toEqual(component.config.customSize.width + 'px');
        expect(sliderEl.styles.left).toEqual('0px');
    }));

    it("Slider: move right", async(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }, { imgSrc: '' }], customSize: { height: 700, width: 1300 } };
        fixture.detectChanges();

        moveSliderItems();

        const sliderEl = el.query(By.css('div.slider-container > ul'));

        expect(sliderEl.styles.left).toEqual(-component.config.customSize.width + 'px');

        moveSliderItems();

        expect(sliderEl.styles.left).toEqual(-component.config.customSize.width * 2 + 'px');

        moveSliderItems();

        expect(sliderEl.styles.left).toEqual('0px');

        moveSliderItems();

        expect(sliderEl.styles.left).toEqual(-component.config.customSize.width + 'px');
    }));

    it("Slider: move left", async(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }, { imgSrc: '' }] };
        fixture.detectChanges();

        moveSliderItems(false);

        const sliderEl = el.query(By.css('div.slider-container > ul'));

        expect(sliderEl.styles.left).toEqual(-600 * 2 + 'px');

        moveSliderItems(false);

        expect(sliderEl.styles.left).toEqual(-600 + 'px');

        moveSliderItems(false);

        expect(sliderEl.styles.left).toEqual('0px');

        moveSliderItems(false);

        expect(sliderEl.styles.left).toEqual(-600 * 2 + 'px');
    }));

    it("Button: next", async(() => {
        const btn = el.query(By.css('div.btn.next'));

        expect(btn.query(By.css('i')).nativeElement.className).toEqual('fa fa-arrow-right');
    }));

    it("Button: previous", async(() => {
        const btn = el.query(By.css('div.btn.prev'));

        expect(btn.query(By.css('i')).nativeElement.className).toEqual('fa fa-arrow-left');
    }));

    it("Counter: default", async(() => {
        const counterEl = fixture.nativeElement.querySelector('div.counter');

        expect(counterEl).toBeDefined();
        expect(counterEl.innerText).toEqual('0 / 0');
    }));

    it("Counter: with items", async(() => {
        component.config = { items: [{ imgSrc: '' }], showCount: true };
        fixture.detectChanges();

        const counterEl = fixture.nativeElement.querySelector('div.counter');

        expect(counterEl).toBeDefined();
        expect(counterEl.innerText).toEqual('1 / 1');
    }));

    it("Counter: move slider", async(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }], showCount: true };
        fixture.detectChanges();

        const counterEl = fixture.nativeElement.querySelector('div.counter');

        moveSliderItems();

        expect(counterEl.innerText).toEqual('2 / 2');

        moveSliderItems(false);

        expect(counterEl.innerText).toEqual('1 / 2');

        moveSliderItems(false);

        expect(counterEl.innerText).toEqual('2 / 2');
    }));

    it("Counter: hide", async(() => {
        component.config = { items: [], showCount: false };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.counter')).toBeNull();
    }));

    it("Pagination: default", async(() => {
        expect(fixture.nativeElement.querySelector('div.pagination-container')).toBeDefined();
    }));

    it("Pagination: hide", async(() => {
        component.config = { items: [], showPagination: false };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.pagination-container')).toBeNull();
    }));

    it("Pagination items: default", async(() => {
        const paginationItemsEls = el.queryAll(By.css('div.pagination-container > ul > li'));
        expect(paginationItemsEls.length).toEqual(0);
    }));

    it("Pagination items: with items", async(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }], showPagination: true };
        fixture.detectChanges();

        const paginationItemsEls = el.queryAll(By.css('div.pagination-container > ul > li'));
        expect(paginationItemsEls.length).toEqual(component.config.items.length);
    }));

    it("Pagination item: active state", async(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }], showPagination: true };
        fixture.detectChanges();

        const paginationItemsEls = el.queryAll(By.css('div.pagination-container > ul > li'));

        expect(paginationItemsEls[0].nativeElement.className).toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).not.toContain(StyleClass.Active);

        moveSliderItems();

        expect(paginationItemsEls[0].nativeElement.className).not.toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).toContain(StyleClass.Active);

        moveSliderItems(false);

        expect(paginationItemsEls[0].nativeElement.className).toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).not.toContain(StyleClass.Active);
    }));

    it("Pagination item: click", async(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }], showPagination: true };
        fixture.detectChanges();

        const paginationItemsEls = el.queryAll(By.css('div.pagination-container > ul > li')),
            sliderEl = el.query(By.css('div.slider-container > ul'));

        expect(sliderEl.styles.left).toEqual('0px');
        expect(paginationItemsEls[0].nativeElement.className).toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).not.toContain(StyleClass.Active);

        clickPaginationItem(1);

        expect(sliderEl.styles.left).toEqual(-600 + 'px');
        expect(paginationItemsEls[0].nativeElement.className).not.toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).toContain(StyleClass.Active);

        clickPaginationItem(0);

        expect(sliderEl.styles.left).toEqual('0px');
        expect(paginationItemsEls[0].nativeElement.className).toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).not.toContain(StyleClass.Active);
    }));

    it("Automation mode: default", async(() => {
        expect(fixture.nativeElement.querySelector('div.pause-action')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.pause-action i.fas fa-pause-circle')).toBeDefined();
    }));

    it("Automation mode: off", async(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }], showPagination: true, movementType: ComponentMovementType.Automatic };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.pause-action')).toBeDefined();
    }));

    it("Automation mode: without defined value for movement type", async(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }], showPagination: true };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.pause-action')).toBeNull();
    }));

    it("Automation mode: in action", fakeAsync(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }], showPagination: true, movementType: ComponentMovementType.Automatic };
        component.ngOnInit();
        fixture.detectChanges();

        const paginationItemsEls = el.queryAll(By.css('div.pagination-container > ul > li')),
            sliderEl = el.query(By.css('div.slider-container > ul'));

        expect(sliderEl.styles.left).toEqual('0px');
        expect(paginationItemsEls[0].nativeElement.className).toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).not.toContain(StyleClass.Active);

        tick(CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS);
        fixture.detectChanges();

        expect(sliderEl.styles.left).toEqual('-600px');
        expect(paginationItemsEls[0].nativeElement.className).not.toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).toContain(StyleClass.Active);

        tick(CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS - 100);
        fixture.detectChanges();

        expect(sliderEl.styles.left).toEqual('-600px');
        expect(paginationItemsEls[0].nativeElement.className).not.toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).toContain(StyleClass.Active);

        tick(100);
        fixture.detectChanges();

        expect(sliderEl.styles.left).toEqual('0px');
        expect(paginationItemsEls[0].nativeElement.className).toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).not.toContain(StyleClass.Active);

        flush();
        discardPeriodicTasks();
    }));

    it("Pause button: click", fakeAsync(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }], showPagination: true, movementType: ComponentMovementType.Automatic };
        component.ngOnInit();
        fixture.detectChanges();

        const paginationItemsEls = el.queryAll(By.css('div.pagination-container > ul > li')),
            sliderEl = el.query(By.css('div.slider-container > ul'));

        tick(CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.pause-action i.fas fa-pause-circle')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.pause-action i.fas fa-play-circle')).toBeNull();

        expect(sliderEl.styles.left).toEqual('-600px');
        expect(paginationItemsEls[0].nativeElement.className).not.toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).toContain(StyleClass.Active);

        clickPause();

        expect(fixture.nativeElement.querySelector('div.pause-action i.fas fa-pause-circle')).toBeNull();
        expect(fixture.nativeElement.querySelector('div.pause-action i.fas fa-play-circle')).toBeDefined();

        tick(CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS);
        fixture.detectChanges();

        expect(sliderEl.styles.left).toEqual('-600px');
        expect(paginationItemsEls[0].nativeElement.className).not.toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).toContain(StyleClass.Active);

        clickPause();

        expect(fixture.nativeElement.querySelector('div.pause-action i.fas fa-pause-circle')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.pause-action i.fas fa-play-circle')).toBeNull();

        tick(CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS);
        fixture.detectChanges();

        expect(sliderEl.styles.left).toEqual('0px');
        expect(paginationItemsEls[0].nativeElement.className).toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).not.toContain(StyleClass.Active);

        flush();
        discardPeriodicTasks();
    }));

    it("Automation mode: on mouse over/out", fakeAsync(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }], showPagination: true, movementType: ComponentMovementType.Automatic };
        component.ngOnInit();
        fixture.detectChanges();

        const paginationItemsEls = el.queryAll(By.css('div.pagination-container > ul > li')),
            sliderEl = el.query(By.css('div.slider-container > ul')),
            containerEl = el.query(By.css('div.slider-container'));

        tick(CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS);
        fixture.detectChanges();

        expect(sliderEl.styles.left).toEqual('-600px');
        expect(paginationItemsEls[0].nativeElement.className).not.toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).toContain(StyleClass.Active);

        containerEl.triggerEventHandler('mouseover', { target: containerEl.nativeElement });
        fixture.detectChanges();

        tick(CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS);
        fixture.detectChanges();

        expect(sliderEl.styles.left).toEqual('-600px');
        expect(paginationItemsEls[0].nativeElement.className).not.toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).toContain(StyleClass.Active);

        containerEl.triggerEventHandler('mouseout', { target: containerEl.nativeElement });
        fixture.detectChanges();

        tick(CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS);
        fixture.detectChanges();

        expect(sliderEl.styles.left).toEqual('0px');
        expect(paginationItemsEls[0].nativeElement.className).toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).not.toContain(StyleClass.Active);

        flush();
        discardPeriodicTasks();
    }));

    it("Automation mode: on mouse out when on pause", fakeAsync(() => {
        component.config = { items: [{ imgSrc: '' }, { imgSrc: '' }], showPagination: true, movementType: ComponentMovementType.Automatic };
        component.ngOnInit();
        fixture.detectChanges();

        const paginationItemsEls = el.queryAll(By.css('div.pagination-container > ul > li')),
            sliderEl = el.query(By.css('div.slider-container > ul')),
            containerEl = el.query(By.css('div.slider-container'));

        tick(CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS);
        fixture.detectChanges();

        expect(sliderEl.styles.left).toEqual('-600px');
        expect(paginationItemsEls[0].nativeElement.className).not.toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).toContain(StyleClass.Active);

        clickPause();

        containerEl.triggerEventHandler('mouseover', { target: containerEl.nativeElement });
        fixture.detectChanges();

        tick(CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS);
        fixture.detectChanges();

        expect(sliderEl.styles.left).toEqual('-600px');
        expect(paginationItemsEls[0].nativeElement.className).not.toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).toContain(StyleClass.Active);

        containerEl.triggerEventHandler('mouseout', { target: containerEl.nativeElement });
        fixture.detectChanges();

        tick(CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS);
        fixture.detectChanges();

        expect(sliderEl.styles.left).toEqual('-600px');
        expect(paginationItemsEls[0].nativeElement.className).not.toContain(StyleClass.Active);
        expect(paginationItemsEls[1].nativeElement.className).toContain(StyleClass.Active);

        flush();
        discardPeriodicTasks();
    }));

    function moveSliderItems(next: boolean = true) {
        const btnEl = el.query(By.css(`div.btn.${next ? 'next' : 'prev'}`));
        btnEl.triggerEventHandler('click', { target: btnEl.nativeElement });
        fixture.detectChanges();
    }

    function clickPaginationItem(index: number) {
        const paginationItemEl = el.queryAll(By.css('div.pagination-container > ul > li'))[index];
        paginationItemEl.triggerEventHandler('click', { target: paginationItemEl.nativeElement });
        fixture.detectChanges();
    }

    function clickPause() {
        const pauseBtnEl = el.query(By.css('div.pause-action'));
        pauseBtnEl.triggerEventHandler('click', { target: pauseBtnEl.nativeElement });
        fixture.detectChanges();
    }
});

