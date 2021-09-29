import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcSliderItemComponent } from './sfc-slider-item.component';
import { SfcComponentsModule } from '../../sfc-components.module';

describe('Component: SfcSliderItemComponent', () => {

    let component: SfcSliderItemComponent;
    let fixture: ComponentFixture<SfcSliderItemComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcSliderItemComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcSliderItemComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcSliderItemComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('li')).toBeDefined();
        expect(fixture.nativeElement.querySelector('li > div > h3')).toBeDefined();
        expect(fixture.nativeElement.querySelector('li > div > span')).toBeDefined();
    }));

    it("Size: default", async(() => {
        const liEl = fixture.nativeElement.querySelector('li');

        expect(liEl.offsetWidth).toEqual(600);
        expect(liEl.offsetHeight).toEqual(400);
    }));

    it("Size: custom value", async(() => {
        component.size = {height: 700, width: 1300};
        fixture.detectChanges();

        const liEl = fixture.nativeElement.querySelector('li');

        expect(liEl.offsetWidth).toEqual(component.size.width);
        expect(liEl.offsetHeight).toEqual(component.size.height);
    }));

    it("Title: default", async(() => {
        const titleEl = fixture.nativeElement.querySelector('li > div > h3');

        expect(titleEl.innerText).toEqual('');
    }));

    it("Title: with value", async(() => {
        component.item = {title: 'title', imgSrc: ''};
        fixture.detectChanges();

        const titleEl = fixture.nativeElement.querySelector('li > div > h3');

        expect(titleEl.innerText).toEqual(component.item.title.toUpperCase());
    }));

    it("Sub-Title: default", async(() => {
        const subTitleEl = fixture.nativeElement.querySelector('li > div > span');

        expect(subTitleEl.innerText).toEqual('');
    }));

    it("Sub-Title: with value", async(() => {
        component.item = {subTitle: 'sub-title', imgSrc: ''};
        fixture.detectChanges();

        const subTitleEl = fixture.nativeElement.querySelector('li > div > span');

        expect(subTitleEl.innerText).toEqual(component.item.subTitle);
    }));

    it("Image: default", async(() => {
        expect(fixture.nativeElement.querySelector('li > img')).toBeNull()
    }));

    it("Image: with value", async(() => {
        component.item = {imgSrc: 'testImage.png'};
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('li > img').src).toContain(component.item.imgSrc);
    }));
});

