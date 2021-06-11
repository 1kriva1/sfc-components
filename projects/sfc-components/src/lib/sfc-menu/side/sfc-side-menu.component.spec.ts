import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcComponentsModule } from '../../sfc-components.module';
import { SfcSideMenuComponent } from './sfc-side-menu.component';
import { SideMenuType, StyleClass } from '../../common/constants/common-constants';

describe('Component: SfcSideMenuComponent', () => {

    let component: SfcSideMenuComponent;
    let fixture: ComponentFixture<SfcSideMenuComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcSideMenuComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcSideMenuComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Header: Should create component", async(() => {
        component.config = { items: [{ id: 1, type: SideMenuType.Header }] };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-side-menu-header')).toBeDefined();
    }));

    it("Header: attributes", async(() => {
        component.config = { isOpen: false, items: [{ id: 1, type: SideMenuType.Header }] };
        fixture.detectChanges();

        const header = el.query(By.css('sfc-side-menu-header'));

        expect(header.componentInstance.label).toEqual('Menu');
        expect(header.componentInstance.isOpen).toBeFalsy();
    }));

    it("Header: on toggle event", async(() => {
        component.config = { isOpen: false, items: [{ id: 1, type: SideMenuType.Header }] };
        fixture.detectChanges();

        expect(fixture.nativeElement.className).not.toContain(StyleClass.Open);

        const hamburger = el.query(By.css('sfc-hamburger'));
        hamburger.triggerEventHandler('click', { target: hamburger.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(StyleClass.Open);
    }));

    it("Item: Should create component", async(() => {
        component.config = { items: [{ id: 1, type: SideMenuType.Item }] };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-side-menu-item')).toBeDefined();
    }));

    it("Item: attributes", async(() => {
        component.config = { isOpen: false, items: [{ id: 1, type: SideMenuType.Item }] };
        fixture.detectChanges();

        const item = el.query(By.css('sfc-side-menu-item'));

        expect(item.componentInstance.item).toEqual(component.config.items[0]);
        expect(item.componentInstance.isOpen).toBeFalsy();
    }));

    it("Item: on click event", async(() => {
        spyOn(component.onSelect, 'emit');
        component.config = { isOpen: false, items: [{ id: 1, type: SideMenuType.Item, isActive: true }, { id: 2, type: SideMenuType.Item }] };
        fixture.detectChanges();

        const items = el.queryAll(By.css('sfc-side-menu-item'));

        expect(items[0].query(By.css('li')).nativeElement.className).toContain(StyleClass.Active);
        expect(items[1].query(By.css('li')).nativeElement.className).not.toContain(StyleClass.Active);

        items[1].triggerEventHandler('click', { target: items[1].nativeElement });
        fixture.detectChanges();

        expect(component.onSelect.emit).toHaveBeenCalled();
        expect(items[0].query(By.css('li')).nativeElement.className).not.toContain(StyleClass.Active);
        expect(items[1].query(By.css('li')).nativeElement.className).toContain(StyleClass.Active);
    }));

    it("Item Sub: Should create component", async(() => {
        component.config = { items: [{ id: 1, type: SideMenuType.ItemWithSub }] };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-side-menu-item-sub')).toBeDefined();
    }));

    it("Item Sub: attributes", async(() => {
        component.config = { isOpen: false, items: [{ id: 1, type: SideMenuType.ItemWithSub, items: [{ id: 2, type: SideMenuType.Item }, { id: 3, type: SideMenuType.Item }] }] };
        fixture.detectChanges();

        const item = el.query(By.css('sfc-side-menu-item-sub'));

        expect(item.componentInstance.item).toEqual(component.config.items[0]);
        expect(item.componentInstance.isOpen).toBeFalsy();
    }));

    it("Item Sub: on click event", async(() => {
        spyOn(component.onSelect, 'emit');
        component.config = { isOpen: false, items: [{ id: 1, type: SideMenuType.ItemWithSub, items: [{ id: 2, type: SideMenuType.Item, isActive: true }, { id: 3, type: SideMenuType.Item }] }] };
        fixture.detectChanges();

        const parentItem = el.query(By.css('sfc-side-menu-item-sub')),
            items = parentItem.queryAll(By.css('sfc-side-menu-item'));

        expect(items[0].query(By.css('li')).nativeElement.className).toContain(StyleClass.Active);
        expect(items[1].query(By.css('li')).nativeElement.className).not.toContain(StyleClass.Active);

        items[1].triggerEventHandler('click', { target: items[1].nativeElement });
        fixture.detectChanges();

        expect(component.onSelect.emit).toHaveBeenCalled();
        expect(items[0].query(By.css('li')).nativeElement.className).not.toContain(StyleClass.Active);
        expect(items[1].query(By.css('li')).nativeElement.className).toContain(StyleClass.Active);
    }));

    it("Title: Should create component", async(() => {
        component.config = { items: [{ id: 1, type: SideMenuType.Title }] };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-side-menu-title')).toBeDefined();
    }));

    it("Title: attributes", async(() => {
        component.config = { items: [{ id: 1, type: SideMenuType.Title, label: 'Title test' }] };
        fixture.detectChanges();

        const title = el.query(By.css('sfc-side-menu-title'));

        expect(title.componentInstance.label).toEqual(component.config.items[0].label);
        expect(title.componentInstance.isOpen).toBeFalsy();
    }));

    it("Items: order", async(() => {
        component.config = { items: [
            { id: 1, type: SideMenuType.Header }, 
            { id: 2, type: SideMenuType.Item }, 
            { id: 3, type: SideMenuType.ItemWithSub, items: [{ id: 31, type: SideMenuType.Item, isActive: true }, { id: 32, type: SideMenuType.Item }] },
            { id: 4, type: SideMenuType.Title, label: 'Title test' }
        ] };
        fixture.detectChanges();

        const ulEl = el.query(By.css('.side-menu-container > ul'));

        expect(ulEl.children[0].name).toEqual('sfc-side-menu-header');
        expect(ulEl.children[1].name).toEqual('sfc-side-menu-item');
        expect(ulEl.children[2].name).toEqual('sfc-side-menu-item-sub');
        expect(ulEl.children[3].name).toEqual('sfc-side-menu-title');
    }));

    it("Config: default value", async(() => {
        expect(component.config).toEqual({ items: [] });
    }));

    it("Config: custom value", async(() => {
        component.config = { items: [{ id: 1, type: SideMenuType.Title, label: 'Title test' }] };
        fixture.detectChanges();

        expect(component.config).toEqual({ items: [{ id: 1, type: SideMenuType.Title, label: 'Title test' }] });
    }));

    it("Empty: toggle host binding value", async(() => {
        expect(fixture.nativeElement.className).toContain(StyleClass.Empty);

        component.config = { items: [{ id: 1, type: SideMenuType.Title, label: 'Title test' }] };
        fixture.detectChanges();

        expect(fixture.nativeElement.className).not.toContain(StyleClass.Empty);
    }));

    it("Open: toggle open parameter", async(() => {
        expect(fixture.nativeElement.className).not.toContain(StyleClass.Open);

        component.config = { isOpen: true, items: [] };
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(StyleClass.Open);
    }));
});