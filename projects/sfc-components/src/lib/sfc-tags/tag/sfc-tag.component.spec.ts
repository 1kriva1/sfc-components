import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcComponentsModule } from '../../sfc-components.module';
import { ComponentSize } from '../../common/constants/common-constants';
import { SfcTagComponent } from './sfc-tag.component';

describe('Component: SfcTagComponent', () => {

    let component: SfcTagComponent;
    let fixture: ComponentFixture<SfcTagComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcTagComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcTagComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcTagComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.tag-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('a.tag-link')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.tag-content')).toBeDefined();
    }));

    it("Size: default", async(() => {
        const tagEl = el.query(By.css('div.tag-container'));
        expect(tagEl.nativeElement.className).toContain(ComponentSize.Medium);
    }));

    it("Size: defined value", async(() => {
        component.tag.size = ComponentSize.Small;
        fixture.detectChanges();

        const tagEl = el.query(By.css('div.tag-container'));
        expect(tagEl.nativeElement.className).toContain(component.tag.size);
    }));

    it("Custom size: default", async(() => {
        const tagEl = el.query(By.css('div.tag-container'));
        expect(tagEl.styles.fontSize).toBeUndefined();
    }));

    it("Custom size: defined value", async(() => {
        component.tag.customSize = 43;
        fixture.detectChanges();

        const tagEl = el.query(By.css('div.tag-container'));
        expect(tagEl.styles.fontSize).toEqual('43px');
    }));

    it("Tag label: default", async(() => {
        const tagContentEl = el.query(By.css('div.tag-content'));
        expect(tagContentEl.nativeElement.innerText).toEqual('');
    }));

    it("Tag label: defined value", async(() => {
        component.tag.label = 'tag one';
        fixture.detectChanges();

        const tagContentEl = el.query(By.css('div.tag-content'));
        expect(tagContentEl.nativeElement.innerText).toEqual(component.tag.label);
    }));

    it("Icon: without icon", async(() => {
        const iconEl = fixture.nativeElement.querySelector('i.icon');
        expect(iconEl).toBeNull();
    }));

    it("Icon: with icon", async(() => {
        component.tag.icon = 'fa fa-test';
        fixture.detectChanges();

        const iconEl = fixture.nativeElement.querySelector('i.icon');

        expect(iconEl.className).toContain('icon');
        expect(iconEl.className).toContain('fa');
        expect(iconEl.className).toContain('fa-test');
    }));
});

