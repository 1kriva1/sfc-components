import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { SfcComponentsModule } from 'projects/sfc-components/src/lib/sfc-components.module';
import { By } from '@angular/platform-browser';
import { SfcTabPanelComponent } from './sfc-tab-panel.component';
import { StyleClass } from '../common/constants/common-constants';

@Component({
    template: `
    <sfc-tab-panel>
    <sfc-tab-item *ngFor="let item of items" label="{{item.itemTitle}}" [selected]="item.selected" [disabled]="item.disabled">
      <sfc-tab-label *ngIf="item.showLabel">
        <sfc-line-tab *ngIf="item.isLine" id="{{item.id}}" title="{{item.title}}">
        </sfc-line-tab>
        <sfc-icon-tab *ngIf="!item.isLine" id="{{item.id}}" title="{{item.title}}">
        </sfc-icon-tab>
      </sfc-tab-label>
      <sfc-tab-body *ngIf="item.showBody">
        {{item.tabBodyText}}
      </sfc-tab-body>
    </sfc-tab-item>
  </sfc-tab-panel>
    `
})
class SfcTabPanelWrapperComponent {

    public items: SfcTabPanelWrapperItem[];

    @ViewChild(SfcTabPanelComponent, { static: false })
    component: SfcTabPanelComponent
}

class SfcTabPanelWrapperItem {

    public tabBodyText: string;

    public showLabel: boolean;

    public showBody: boolean;

    public itemTitle: string;

    public title: string;

    public id: string;

    public disabled: boolean;

    public selected: boolean;

    public isLine: boolean;
}

describe('Component: SfcTabPanelComponent', () => {

    let component: SfcTabPanelWrapperComponent;
    let fixture: ComponentFixture<SfcTabPanelWrapperComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [SfcTabPanelWrapperComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcTabPanelWrapperComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcTabPanelComponent: Should create component", async(() => {
        expect(component.component).toBeDefined();
    }));

    it("SfcTabPanelComponent: should create main element", async(() => {
        expect(fixture.nativeElement.querySelector('.tabs-header')).toBeDefined();
        expect(fixture.nativeElement.querySelector('.tabs-body')).toBeDefined();
    }));

    it("Header: items by default", async(() => {
        const items = fixture.nativeElement.querySelector('.tab-label');
        expect(items).toBeNull();
    }));

    it("Header: items when defined", fakeAsync(() => {
        initItems(2);

        const items = fixture.nativeElement.querySelectorAll('.tab-label');
        expect(items).toBeDefined();
        expect(items.length).toEqual(component.items.length);
    }));

    it("Header Item: width css property", fakeAsync(() => {
        initItems(1);

        const item = fixture.nativeElement.querySelector('.tab-label');
        expect(item.style.width).toEqual('100%');

        initItems(2);

        const items = fixture.nativeElement.querySelectorAll('.tab-label');

        items.forEach((tab) => {
            expect(tab.style.width).toEqual('50%');
        })
    }));

    it("Header Item: click event", fakeAsync(() => {
        initItems(2);

        let items = fixture.nativeElement.querySelectorAll('.tab-label');

        expect(items[0].className).toContain(StyleClass.Active);
        expect(items[1].className).not.toContain(StyleClass.Active);

        clickTab(1);

        items = fixture.nativeElement.querySelectorAll('.tab-label');

        expect(items[0].className).not.toContain(StyleClass.Active);
        expect(items[1].className).toContain(StyleClass.Active);
    }));

    it("Header Item: click disabled item", fakeAsync(() => {
        initItems(2);
        component.items[1].disabled = true;
        fixture.detectChanges();

        let items = fixture.nativeElement.querySelectorAll('.tab-label');

        expect(items[0].className).toContain(StyleClass.Active);
        expect(items[1].className).not.toContain(StyleClass.Active);

        clickTab(1);

        items = fixture.nativeElement.querySelectorAll('.tab-label');

        expect(items[0].className).toContain(StyleClass.Active);
        expect(items[1].className).not.toContain(StyleClass.Active);
    }));

    it("Header Item: click already selected item", fakeAsync(() => {
        initItems(2);

        let items = fixture.nativeElement.querySelectorAll('.tab-label');

        expect(items[0].className).toContain(StyleClass.Active);
        expect(items[1].className).not.toContain(StyleClass.Active);

        clickTab(0);

        items = fixture.nativeElement.querySelectorAll('.tab-label');

        expect(items[0].className).toContain(StyleClass.Active);
        expect(items[1].className).not.toContain(StyleClass.Active);
    }));

    it("Header Item: active by default first", fakeAsync(() => {
        initItems(2);

        let items = fixture.nativeElement.querySelectorAll('.tab-label');

        expect(items[0].className).toContain(StyleClass.Active);
        expect(items[1].className).not.toContain(StyleClass.Active);
    }));

    it("Header Item: active by custom definition", fakeAsync(() => {
        component.items = getWrapItems(2);
        component.items[1].selected = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        let items = fixture.nativeElement.querySelectorAll('.tab-label');

        expect(items[0].className).not.toContain(StyleClass.Active);
        expect(items[1].className).toContain(StyleClass.Active);
    }));

    it("Header Item: when label content not defined", fakeAsync(() => {
        initItems(1);
        component.items[0].showLabel = false;
        fixture.detectChanges();

        let labelTab = fixture.nativeElement.querySelector('sfc-line-tab'),
            item = fixture.nativeElement.querySelector('.tab-label');

        expect(labelTab).toBeNull();
        expect(item.innerText).toEqual('item title 0');
    }));

    it("Header Item: when label content defined", fakeAsync(() => {
        initItems(1);

        let labelTab = fixture.nativeElement.querySelector('sfc-line-tab'),
            item = fixture.nativeElement.querySelector('.tab-label');

        expect(labelTab).toBeDefined();
        expect(item.innerText).not.toEqual('item title 0');
    }));

    it("Line slider: should create component", fakeAsync(() => {
        initItems(1);

        const lineSlider = el.query(By.css('sfc-line-tab-slider')),
            iconSlider = el.query(By.css('sfc-icon-tab-slider'));

        expect(lineSlider).toBeDefined();
        expect(iconSlider).toBeNull();
        expect(lineSlider.attributes['ng-reflect-length']).toEqual('1');
        expect(lineSlider.attributes['ng-reflect-selected-index']).toEqual('0');
    }));

    it("Icon slider: should create component", fakeAsync(() => {
        initItems(1);
        component.items[0].isLine = false;
        fixture.detectChanges();

        const lineSlider = el.query(By.css('sfc-line-tab-slider')),
            iconSlider = el.query(By.css('sfc-icon-tab-slider'));

        expect(lineSlider).toBeNull();
        expect(iconSlider).toBeDefined();
        expect(iconSlider.attributes['ng-reflect-length']).toEqual('1');
        expect(iconSlider.attributes['ng-reflect-selected-index']).toEqual('0');
    }));

    it("Body: when body not defined", fakeAsync(() => {
        initItems(1);
        component.items[0].showBody = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.tabs-body').innerText).toEqual('');
    }));

    it("Body: when body defined", fakeAsync(() => {
        initItems(1);

        expect(fixture.nativeElement.querySelector('.tabs-body').innerText).toEqual('body test 0');
    }));

    it("Body: when change tab", fakeAsync(() => {
        initItems(2);
        
        let body = fixture.nativeElement.querySelector('.tabs-body');

        expect(body.innerText).toEqual('body test 0');

        clickTab(1);

        body = fixture.nativeElement.querySelector('.tabs-body');

        expect(body.innerText).toEqual('body test 1');
    }));

    function clickTab(tabIndex: number){
        const tab = el.queryAll(By.css('.tab-label'))[tabIndex];
        tab.triggerEventHandler('click', { target: tab.nativeElement });
        fixture.detectChanges();
    }

    function initItems(count: number){
        component.items = getWrapItems(count);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
    }

    function getWrapItems(count: number) {
        let result: SfcTabPanelWrapperItem[] = [];
        for (let index = 0; index < count; index++) {
            result.push({
                showLabel: true,
                showBody: true,
                id: 'test-' + index,
                disabled: false,
                selected: false,
                tabBodyText: 'body test ' + index,
                itemTitle: 'item title ' + index,
                title: 'title ' + index,
                isLine: true
            })
        }

        return result;
    }
});