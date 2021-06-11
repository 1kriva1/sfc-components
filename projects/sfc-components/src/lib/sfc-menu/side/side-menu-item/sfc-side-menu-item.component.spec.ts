import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { SideMenuType, StyleClass } from '../../../common/constants/common-constants';
import { SfcSideMenuItemComponent } from './sfc-side-menu-item.component';

describe('Component: SfcSideMenuItemComponent', () => {

    let component: SfcSideMenuItemComponent;
    let fixture: ComponentFixture<SfcSideMenuItemComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcSideMenuItemComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcSideMenuItemComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcSideMenuItemComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('li.side-menu-item')).toBeDefined();
        expect(fixture.nativeElement.querySelector('a.side-menu-item-link')).toBeDefined();
        expect(fixture.nativeElement.querySelector('i.side-menu-item-icon')).toBeDefined();
        expect(fixture.nativeElement.querySelector('span.side-menu-item-title')).toBeDefined();
    }));

    it("Active status: when not active", async(() => {
        expect(fixture.nativeElement.querySelector('li.side-menu-item').className).not.toContain(StyleClass.Active);
    }));

    it("Active status: when active", async(() => {
        component.item = { id: 1, isActive: true, type: SideMenuType.Item };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('li.side-menu-item').className).toContain(StyleClass.Active);
    }));

    it("Icon: without icon", async(() => {
        const icon = fixture.nativeElement.querySelector('i.side-menu-item-icon');

        expect(icon.className).not.toContain('fa');
        expect(icon.className).not.toContain('fa-star');
    }));

    it("Icon: with icon", async(() => {
        component.item = { id: 1, isActive: true, type: SideMenuType.Item, icon: 'fa fa-star' };
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('i.side-menu-item-icon');

        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-star');
    }));

    it("Label: without value", async(() => {
        expect(fixture.nativeElement.querySelector('span.side-menu-item-title').innerHTML).toEqual('');
    }));

    it("Label: with value", async(() => {
        component.item = { id: 1, isActive: true, type: SideMenuType.Item, label: 'test label' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.side-menu-item-title').innerHTML).toEqual('test label');
    }));

    it("Open: toggle open parameter", async(() => {
        expect(fixture.nativeElement.className).not.toEqual(StyleClass.Open);

        component.isOpen = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toEqual(StyleClass.Open);
    }));

    it("Item: default state", async(() => {
        expect(component.item.id).toEqual(null);
        expect(component.item.type).toEqual(SideMenuType.Item);
    }));

    it("Item: custom state", async(() => {
        component.item = { id: 1, isActive: true, type: SideMenuType.Title, label: 'test label', icon: 'fa fa star', items: [{ id: 1, type: SideMenuType.Item}] };
        fixture.detectChanges();

        expect(component.item.id).toEqual(1);
        expect(component.item.type).toEqual(SideMenuType.Title);
        expect(component.item.label).toEqual('test label');
        expect(component.item.icon).toEqual('fa fa star');
        expect(component.item.isActive).toBeTruthy();
        expect(component.item.items.length).toEqual(1);
    }));
});