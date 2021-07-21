import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcComponentsModule } from '../sfc-components.module';
import { SfcTagsComponent } from './sfc-tags.component';
import { ComponentSize } from '../common/constants/common-constants';

describe('Component: SfcTagsComponent', () => {

    let component: SfcTagsComponent;
    let fixture: ComponentFixture<SfcTagsComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcTagsComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcTagsComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcTagsComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.tags-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.tags-inner-container')).toBeDefined();
    }));

    it("Tags: default(empty)", async(() => {
        const tagEls = el.queryAll(By.css('sfc-tag'));
        expect(tagEls.length).toEqual(0);
    }));

    it("Tags: not empty", async(() => {
        component.tags = [{label: 'tag one'},{label: 'tag two'}];
        fixture.detectChanges();

        const tagEls = el.queryAll(By.css('sfc-tag'));
        expect(tagEls.length).toEqual(component.tags.length);
    }));

    it("Tags: tag attributes", async(() => {
        component.tags = [{label: 'tag one', icon: 'fa fa-test', size: ComponentSize.Large, customSize: 43 }];
        fixture.detectChanges();

        const tagEl = el.query(By.css('sfc-tag'));
        expect(tagEl.componentInstance.tag).toEqual(component.tags[0]);
    }));
});

