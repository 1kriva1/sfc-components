import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { SideMenuType, StyleClass } from '../../../common/constants/common-constants';
import { SfcSideMenuItemSubComponent } from './sfc-side-menu-item-sub.component';
import { By } from '@angular/platform-browser';

describe('Component: SfcSideMenuItemSubComponent', () => {

    let component: SfcSideMenuItemSubComponent;
    let fixture: ComponentFixture<SfcSideMenuItemSubComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcSideMenuItemSubComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcSideMenuItemSubComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcSideMenuItemSubComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('li.side-menu-item')).toBeDefined();
        expect(fixture.nativeElement.querySelector('a.side-menu-item-link')).toBeDefined();
        expect(fixture.nativeElement.querySelector('i.side-menu-item-icon')).toBeDefined();
        expect(fixture.nativeElement.querySelector('span.side-menu-item-title')).toBeDefined();
        expect(fixture.nativeElement.querySelector('fa-icon')).toBeDefined();
    }));

    it("Active status: when not defined", async(() => {
        expect(fixture.nativeElement.querySelector('li.side-menu-item').className).not.toContain(StyleClass.Active);
    }));

    it("Active status: when not active", async(() => {
        component.item = { id: 1, type: SideMenuType.ItemWithSub, items: [{ id: 1, isActive: false, type: SideMenuType.Item }] };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('li.side-menu-item').className).not.toContain(StyleClass.Active);
    }));

    it("Active status: when active", async(() => {
        component.item = { id: 1, type: SideMenuType.ItemWithSub, items: [{ id: 1, isActive: true, type: SideMenuType.Item }] };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('li.side-menu-item').className).toContain(StyleClass.Active);
    }));

    it("Active status: when is local open = true", async(() => {
        component.item = { id: 1, type: SideMenuType.ItemWithSub, items: [{ id: 1, isActive: true, type: SideMenuType.Item }] };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('li.side-menu-item').className).toContain(StyleClass.Active);

        clickItem();

        expect(fixture.nativeElement.querySelector('li.side-menu-item').className).not.toContain(StyleClass.Active);
    }));

    it("Icon: without icon", async(() => {
        const icon = fixture.nativeElement.querySelector('i.side-menu-item-icon');

        expect(icon.className).not.toContain('fa');
        expect(icon.className).not.toContain('fa-star');
    }));

    it("Icon: with icon", async(() => {
        component.item = { id: 1, type: SideMenuType.ItemWithSub, icon: 'fa fa-star' };
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('i.side-menu-item-icon');

        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-star');
    }));

    it("Label: without value", async(() => {
        expect(fixture.nativeElement.querySelector('span.side-menu-item-title').innerHTML).toEqual('');
    }));

    it("Label: with value", async(() => {
        component.item = { id: 1, type: SideMenuType.ItemWithSub, label: 'test label' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.side-menu-item-title').innerHTML).toEqual('test label');
    }));

    it("Arrow icon: default", async(() => {
        expect(fixture.nativeElement.querySelector('fa-icon > svg').classList.contains('fa-angle-down')).toBeTruthy();
    }));

    it("Arrow icon: when is local open = true", async(() => {
        clickItem();

        expect(fixture.nativeElement.querySelector('fa-icon > svg').classList.contains('fa-angle-up')).toBeTruthy();
    }));

    it("Children container: when is local open = false", async(() => {
        expect(fixture.nativeElement.querySelector('.side-menu-item-children')).toBeNull();
    }));

    it("Children container: when is local open = true", async(() => {
        clickItem();

        expect(fixture.nativeElement.querySelector('.side-menu-item-children')).toBeDefined();
    }));

    it("Children items: count", async(() => {
        component.item = { id: 1, type: SideMenuType.ItemWithSub, items: [{ id: 1, isActive: true, type: SideMenuType.Item }] };
        fixture.detectChanges();

        clickItem();

        expect(fixture.nativeElement.querySelectorAll('sfc-side-menu-item').length).toEqual(component.item.items.length);
    }));

    it("Children items: item properties", async(() => {
        component.isOpen = true;
        component.item = { id: 1, type: SideMenuType.ItemWithSub, items: [{ id: 1, isActive: true, type: SideMenuType.Item }] };
        fixture.detectChanges();

        clickItem();

        const item = el.queryAll(By.css('sfc-side-menu-item'))[0];

        expect(item.componentInstance.isOpen).toBeTruthy();
        expect(item.componentInstance.item).toEqual(component.item.items[0]);
    }));

    it("Children items: on click event", async(() => {
        spyOn<any>(component, 'onChildClick').and.callThrough();
        spyOn(component.onClick, 'emit');  

        component.item = { id: 1, type: SideMenuType.ItemWithSub, items: [{ id: 1, isActive: true, type: SideMenuType.Item }] };
        fixture.detectChanges();

        clickItem();

        const item = el.queryAll(By.css('sfc-side-menu-item'))[0];
        item.triggerEventHandler('click', { target: item.nativeElement });
        fixture.detectChanges();
        
        expect(component['onChildClick']).toHaveBeenCalled();
        expect(component.onClick.emit).toHaveBeenCalled();
    }));

    it("Open: toggle open parameter", async(() => {
        expect(fixture.nativeElement.className).not.toContain(StyleClass.Open);

        component.isOpen = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(StyleClass.Open);
    }));

    it("Item sub: default state", async(() => {
        expect(component.item.id).toEqual(null);
        expect(component.item.type).toEqual(SideMenuType.Item);
        expect(component.item.items).toBeUndefined();
    }));

    it("Item sub: custom state", async(() => {
        component.item = { id: 1, type: SideMenuType.ItemWithSub, label: 'test label', icon: 'fa fa star', items: [{ id: 1, type: SideMenuType.Item, isActive: true }] };
        fixture.detectChanges();

        expect(component.item.id).toEqual(1);
        expect(component.item.type).toEqual(SideMenuType.ItemWithSub);
        expect(component.item.label).toEqual('test label');
        expect(component.item.icon).toEqual('fa fa star');
        expect(component.item.items.length).toEqual(1);
        expect(component.item.items[0].isActive).toBeTruthy();
    }));

    function clickItem() {
        const item = el.query(By.css('li.side-menu-item'));
        item.triggerEventHandler('click', { target: item.nativeElement });
        fixture.detectChanges();
    }
});