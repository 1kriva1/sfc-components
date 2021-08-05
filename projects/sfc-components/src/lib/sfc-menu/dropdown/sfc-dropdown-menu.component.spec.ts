import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../sfc-components.module';
import { SfcDropdownMenuComponent } from '../dropdown/sfc-dropdown-menu.component';
import { By } from '@angular/platform-browser';
import { DropdownMenuPosition } from '../../common/constants/common-constants';

describe('Component: SfcDropdownMenuComponent', () => {

    let component: SfcDropdownMenuComponent;
    let fixture: ComponentFixture<SfcDropdownMenuComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcDropdownMenuComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcDropdownMenuComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcDropdownMenuComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('ul')).toBeDefined();
        expect(fixture.nativeElement.querySelector('li')).toBeDefined();
        expect(fixture.nativeElement.querySelector('ul li div.dot-container')).toBeDefined();
    }));

    it("Active: on/off by toggle", async(() => {
        spyOn<any>(component, 'onToggleClick').and.callThrough();

        expect(fixture.nativeElement.querySelector('ul.active')).toBeNull();

        toggleClick();
        
        expect(fixture.nativeElement.querySelector('ul.active')).toBeDefined();

        toggleClick();

        expect(component['onToggleClick']).toHaveBeenCalledTimes(2);
        expect(fixture.nativeElement.querySelector('ul.active')).toBeNull();
    }));


    it("Active: on/off by item(with hideOnClick = false)", async(() => {
        spyOn<any>(component, 'onClick').and.callThrough();

        component.config = { hideOnClick: false, items: [{}] };
        fixture.detectChanges();

        toggleClick();

        expect(fixture.nativeElement.querySelector('ul.active')).toBeDefined();

        const menuItemEl = el.query(By.css('sfc-dropdown-menu-item'));
        menuItemEl.triggerEventHandler('click', { target: menuItemEl.nativeElement });
        fixture.detectChanges();

        expect(component['onClick']).toHaveBeenCalledTimes(1);
        expect(fixture.nativeElement.querySelector('ul.active')).toBeDefined();
    }));

    it("Active: on/off by item(with hideOnClick = true)", async(() => {
        spyOn<any>(component, 'onClick').and.callThrough();

        component.config = { hideOnClick: true, items: [{}] };
        fixture.detectChanges();

        toggleClick();

        expect(fixture.nativeElement.querySelector('ul.active')).toBeDefined();

        const menuItemEl = el.query(By.css('sfc-dropdown-menu-item'));
        menuItemEl.triggerEventHandler('click', { target: menuItemEl.nativeElement });
        fixture.detectChanges();

        expect(component['onClick']).toHaveBeenCalledTimes(1);
        expect(fixture.nativeElement.querySelector('ul.active')).toBeNull();
    }));

    it("Active: on/off by click outside = false", async(() => {
        spyOn<any>(component, 'clickout').and.callThrough();

        component.config = { clickOutside: false, items: [{}] };
        fixture.detectChanges();

        toggleClick();

        expect(fixture.nativeElement.querySelector('ul.active')).toBeDefined();

        document.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component['clickout']).toHaveBeenCalledTimes(1);
        expect(fixture.nativeElement.querySelector('ul.active')).toBeDefined();
    }));

    it("Active: on/off by click outside = true", async(() => {
        spyOn<any>(component, 'clickout').and.callThrough();

        component.config = { clickOutside: true, items: [{}] };
        fixture.detectChanges();

        toggleClick();

        expect(fixture.nativeElement.querySelector('ul.active')).toBeDefined();

        document.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component['clickout']).toHaveBeenCalledTimes(1);
        expect(fixture.nativeElement.querySelector('ul.active')).toBeNull();
    }));

    it("Active: on/off by click outside = true, but not active component", async(() => {
        spyOn<any>(component, 'clickout').and.callThrough();

        component.config = { clickOutside: true, items: [{}] };
        fixture.detectChanges();

        toggleClick();

        expect(fixture.nativeElement.querySelector('ul.active')).toBeDefined();

        toggleClick();

        document.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component['clickout']).toHaveBeenCalledTimes(1);
        expect(fixture.nativeElement.querySelector('ul.active')).toBeNull();
    }));

    it("Active: on/off by click outside = true, but click on component", async(() => {
        spyOn<any>(component, 'clickout').and.callThrough();

        component.config = { clickOutside: true, items: [{}] };
        fixture.detectChanges();

        toggleClick();

        expect(fixture.nativeElement.querySelector('ul.active')).toBeDefined();
        
        const ulEl = el.query(By.css('ul'));
        ulEl.triggerEventHandler('click', { target: ulEl.nativeElement });
        fixture.detectChanges();

        expect(component['clickout']).not.toHaveBeenCalled();
        expect(fixture.nativeElement.querySelector('ul.active')).toBeDefined();
    }));

    it("Bordered: off by default", async(() => {
        expect(fixture.nativeElement.querySelector('div.dot-container.bordered')).toBeNull();
    }));

    it("Bordered: on", async(() => {
        component.config = { bordered: true, items: [{}] };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.dot-container.bordered')).toBeDefined();
    }));

    it("Label: not exist", async(() => {
        expect(fixture.nativeElement.querySelector('div.dot-container span')).toBeNull();
    }));

    it("Label: exist", async(() => {
        component.config = { label: 'Test label', items: [{}] };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.dot-container span').innerText).toEqual(component.config.label);
    }));

    it("Icon: without icon", async(() => {
        const iconEl = fixture.nativeElement.querySelector('div.dot-container i');
        expect(iconEl).toBeNull();
    }));

    it("Icon: with icon", async(() => {
        component.config = { icon: 'fa fa-test', items: [{}] };
        fixture.detectChanges();

        const iconEl = fixture.nativeElement.querySelector('div.dot-container i');

        expect(iconEl.className).toContain('fa');
        expect(iconEl.className).toContain('fa-test');
    }));

    it("Icon: styles", async(() => {
        component.config = { icon: 'fa fa-test', items: [{}] };
        fixture.detectChanges();

        const iconEl = fixture.nativeElement.querySelector('div.dot-container i');

        expect(iconEl.style['margin-left']).toEqual('0px');

        component.config = { icon: 'fa fa-test', label: 'Test label', items: [{}] };
        fixture.detectChanges();

        expect(iconEl.style['margin-left']).toEqual('5px');
    }));

    it("Dotted: not exist (icon exist)", async(() => {
        component.config = { icon: 'fa fa-test', items: [{}] };
        fixture.detectChanges();

        const dottedEl = fixture.nativeElement.querySelector('sfc-dotted');

        expect(dottedEl).toBeNull();
    }));

    it("Dotted: not exist (label exist)", async(() => {
        component.config = { label: 'Test label', items: [{}] };
        fixture.detectChanges();

        const dottedEl = fixture.nativeElement.querySelector('sfc-dotted');

        expect(dottedEl).toBeNull();
    }));

    it("Dotted: exist", async(() => {
        component.config = { items: [{}] };
        fixture.detectChanges();

        const dottedEl = el.query(By.css('sfc-dotted'));

        expect(dottedEl).toBeDefined();
        expect(dottedEl.attributes['ng-reflect-active']).toEqual('false');     
        
        toggleClick();

        expect(dottedEl.attributes['ng-reflect-active']).toEqual('true'); 
    }));

    it("Dropdown: not exist", async(() => {
        const dropdownEl = fixture.nativeElement.querySelector('ul.dropdown');

        expect(dropdownEl).toBeNull();

        component.config = { items: [] };
        fixture.detectChanges();

        expect(dropdownEl).toBeNull();
    }));

    it("Dropdown: exist", async(() => {
        component.config = { items: [{}] };
        fixture.detectChanges();

        const dropdownEl = fixture.nativeElement.querySelector('ul.dropdown');

        expect(dropdownEl).toBeDefined();
    }));

    it("Dropdown: position default", async(() => {
        component.config = { items: [{}] };
        fixture.detectChanges();

        const dropdownEl = fixture.nativeElement.querySelector('ul.dropdown.' + DropdownMenuPosition.Left);

        expect(dropdownEl).toBeDefined();
    }));

    it("Dropdown: position defined", async(() => {
        component.config = { position: DropdownMenuPosition.Top + ' ' + DropdownMenuPosition.Right, items: [{}] };
        fixture.detectChanges();

        const dropdownEl = fixture.nativeElement.querySelector(`ul.dropdown.${DropdownMenuPosition.Right}.${DropdownMenuPosition.Top}`);

        expect(dropdownEl).toBeDefined();
    }));

    it("Dropdown: items", async(() => {
        component.config = { items: [{label: 'item 1'}, {icon: 'fa fa-test'}] };
        fixture.detectChanges();

        const menuItemEls = el.queryAll(By.css('sfc-dropdown-menu-item'));

        expect(menuItemEls.length).toEqual(component.config.items.length);
        expect(menuItemEls[0].componentInstance.item).toEqual(component.config.items[0]);
    }));

    it("Config: default", async(() => {
        expect(component.config).toEqual({ items: [], clickOutside: true });
    }));

    it("Menu item: on-select event", async(() => {
        spyOn(component.onSelect, 'emit');

        component.config = { items: [{}] };
        fixture.detectChanges();

        const menuItemEl = el.query(By.css('sfc-dropdown-menu-item'));
        menuItemEl.triggerEventHandler('click', { target: menuItemEl.nativeElement });
        fixture.detectChanges();

        expect(component.onSelect.emit).toHaveBeenCalledTimes(1);
    }));

    function toggleClick(){
        const toggleEl = el.query(By.css('div.dot-container'));
        toggleEl.triggerEventHandler('click', { target: toggleEl.nativeElement });
        fixture.detectChanges();
    }
});