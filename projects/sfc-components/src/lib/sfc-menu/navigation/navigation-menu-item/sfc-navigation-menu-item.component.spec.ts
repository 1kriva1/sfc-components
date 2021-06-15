import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { StyleClass } from '../../../common/constants/common-constants';
import { SfcNavigationMenuItemComponent } from './sfc-navigation-menu-item.component';

describe('Component: SfcNavigationMenuItemComponent', () => {

    let component: SfcNavigationMenuItemComponent;
    let fixture: ComponentFixture<SfcNavigationMenuItemComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcNavigationMenuItemComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcNavigationMenuItemComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcNavigationMenuItemComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.nav-item')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.nav-item > i')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.nav-item > span.nav-item-text')).toBeDefined();
    }));

    it("Active status: when not active", async(() => {
        expect(fixture.nativeElement.querySelector('div.nav-item').className).not.toContain(StyleClass.Active);
    }));

    it("Active status: when active", async(() => {
        component.item = { id: 1, isActive: true };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.nav-item').className).toContain(StyleClass.Active);
    }));

    it("Icon: without icon", async(() => {
        const icon = fixture.nativeElement.querySelector('i');

        expect(icon.className).not.toContain('fa');
        expect(icon.className).not.toContain('fa-star');
    }));

    it("Icon: with icon", async(() => {
        component.item = { id: 1, isActive: true, icon: 'fa fa-star' };
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('i');

        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-star');
    }));

    it("Label: without value", async(() => {
        expect(fixture.nativeElement.querySelector('span.nav-item-text').innerHTML).toEqual('');
    }));

    it("Label: with value", async(() => {
        component.item = { id: 1, isActive: true, label: 'test label' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.nav-item-text').innerHTML).toEqual('test label');
    }));

    it("Item: default state", async(() => {
        expect(component.item.id).toEqual(null);
    }));

    it("Item: custom state", async(() => {
        component.item = { id: 1, isActive: true, label: 'test label', icon: 'fa fa star' };
        fixture.detectChanges();

        expect(component.item.id).toEqual(1);
        expect(component.item.label).toEqual('test label');
        expect(component.item.icon).toEqual('fa fa star');
        expect(component.item.isActive).toBeTruthy();
    }));
});