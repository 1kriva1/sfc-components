import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcCarouselItemDefaultComponent } from './sfc-carousel-item-default.component';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { By } from '@angular/platform-browser';
import { ComponentSize, PositionType } from '../../../common/constants/common-constants';

describe('Component: SfcCarouselItemDefaultComponent', () => {

    let component: SfcCarouselItemDefaultComponent;
    let fixture: ComponentFixture<SfcCarouselItemDefaultComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcCarouselItemDefaultComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcCarouselItemDefaultComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Carousel item: attributes", async(() => {
        component.count = 3;
        component.currentIndex = 2;
        component.index = 1;
        component.previousIndex = 1;
        component.size = ComponentSize.Large;
        component.type = PositionType.Vertical;
        component.state = { created: true, removed: false, hidden: false };
        component.item = { imgSrc: 'imgSrcValue', labelBottom: 'labelBottomValue', labelTop: 'labelTopValue', titleBottom: 'titleBottomValue', titleTop: 'titleTopValue' };
        fixture.detectChanges();

        const carouselItem = el.query(By.css('sfc-carousel-item'));

        expect(carouselItem).toBeDefined();
        expect(carouselItem.attributes['ng-reflect-type']).toEqual(PositionType.Vertical);
        expect(carouselItem.attributes['ng-reflect-count']).toEqual(component.count.toString());
        expect(carouselItem.attributes['ng-reflect-current-index']).toEqual(component.currentIndex.toString());
        expect(carouselItem.attributes['ng-reflect-index']).toEqual(component.index.toString());
        expect(carouselItem.attributes['ng-reflect-previous-index']).toEqual(component.previousIndex.toString());
        expect(carouselItem.componentInstance.state).toEqual(component.state);
    }));

    it("Container: should create element", async(() => {
        expect(fixture.nativeElement.querySelector('div.content-container')).toBeDefined();
    }));

    it("Container: size class", async(() => {
        component.size = ComponentSize.Large;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.content-container.large')).toBeDefined();
    }));

    it("Main elements: should exist", async(() => {
        expect(fixture.nativeElement.querySelector('div.labels.top')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.labels.bottom')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.image-container.circle')).toBeDefined();
    }));

    it("Label top: values", async(() => {
        component.item = { imgSrc: 'imgSrcValue', labelBottom: 'labelBottomValue', labelTop: 'labelTopValue', titleBottom: 'titleBottomValue', titleTop: 'titleTopValue' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.labels.top h3').innerText).toEqual(component.item.titleTop.toUpperCase());
        expect(fixture.nativeElement.querySelector('div.labels.top span').innerText).toEqual(component.item.labelTop);
    }));

    it("Label bottom: values", async(() => {
        component.item = { imgSrc: 'imgSrcValue', labelBottom: 'labelBottomValue', labelTop: 'labelTopValue', titleBottom: 'titleBottomValue', titleTop: 'titleTopValue' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.labels.bottom h3').innerText).toEqual(component.item.titleBottom.toUpperCase());
        expect(fixture.nativeElement.querySelector('div.labels.bottom span').innerText).toEqual(component.item.labelBottom);
    }));

    it("Image: when not exist", async(() => {
        expect(fixture.nativeElement.querySelector('div.image-container a.circle span.image')).toBeNull();
    }));

    it("Image: when exist", async(() => {
        component.item = { imgSrc: 'imgSrcValue' };
        fixture.detectChanges();

        const imageEl = fixture.nativeElement.querySelector('div.image-container a.circle span.image');

        expect(imageEl).toBeDefined();
        expect(getComputedStyle(imageEl).backgroundImage).toContain(component.item.imgSrc);
    }));

    it("Item size: calculated value", async(() => {
        const elSize = (<HTMLElement>fixture.nativeElement).getBoundingClientRect()

        expect(component.itemSize).toEqual({width:elSize.width, height: elSize.height});
    }));

    it("Item size: calculated value when not center item", async(() => {
        component.currentIndex = 2;
        component.index = 1;
        fixture.detectChanges();

        const elSize = (<HTMLElement>fixture.nativeElement).getBoundingClientRect()

        expect(component.itemSize).toEqual({width:elSize.width/0.7, height: elSize.height/0.7});
    }));
});

