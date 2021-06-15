import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcComponentsModule } from '../../sfc-components.module';
import { StyleClass } from '../../common/constants/common-constants';
import { SfcNavigationMenuComponent } from './sfc-navigation-menu.component';

describe('Component: SfcNavigationMenuComponent', () => {

    let component: SfcNavigationMenuComponent;
    let fixture: ComponentFixture<SfcNavigationMenuComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcNavigationMenuComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcNavigationMenuComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcNavigationMenuComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.nav-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.nav-row')).toBeDefined();
    }));

    it("Item: should create component", async(() => {
        component.config = { items: [{ id: 1 }] };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-navigation-menu-item')).toBeDefined();
    }));

    it("Item: attribute", async(() => {
        component.config = { items: [{ id: 1, label: 'Test item' }] };
        fixture.detectChanges();

        const item = el.query(By.css('sfc-navigation-menu-item'));

        expect(item.componentInstance.item).toEqual(component.config.items[0]);
    }));

    it("Item: on click event", async(() => {
        spyOn(component.onSelect, 'emit');
        component.config = { items: [{ id: 1, isActive: true }, { id: 2 }] };
        fixture.detectChanges();

        const items = el.queryAll(By.css('sfc-navigation-menu-item'));

        expect(items[0].query(By.css('div.nav-item')).nativeElement.className).toContain(StyleClass.Active);
        expect(items[1].query(By.css('div.nav-item')).nativeElement.className).not.toContain(StyleClass.Active);

        items[1].triggerEventHandler('click', { target: items[1].nativeElement });
        fixture.detectChanges();

        expect(component.onSelect.emit).toHaveBeenCalled();
        expect(items[0].query(By.css('div.nav-item')).nativeElement.className).not.toContain(StyleClass.Active);
        expect(items[1].query(By.css('div.nav-item')).nativeElement.className).toContain(StyleClass.Active);
    }));

    it("Config: default value", async(() => {
        expect(component.config).toEqual({ items: [] });
    }));

    it("Config: custom value", async(() => {
        component.config = { items: [{ id: 1, label: 'Title test' }] };
        fixture.detectChanges();

        expect(component.config).toEqual({ items: [{ id: 1, label: 'Title test' }] });
    }));

    it("Items: order", async(() => {
        component.config = { items: [
            { id: 1, label: 'Label 1' }, 
            { id: 2, label: 'Label 2' }, 
            { id: 3, label: 'Label 3' },
            { id: 4, label: 'Label 4' }
        ] };
        fixture.detectChanges();

        const labelElements = el.queryAll(By.css('div.nav-item > span.nav-item-text'));

        expect(labelElements[0].nativeElement.innerHTML).toEqual(component.config.items[0].label);
        expect(labelElements[1].nativeElement.innerHTML).toEqual(component.config.items[1].label);
        expect(labelElements[2].nativeElement.innerHTML).toEqual(component.config.items[2].label);
        expect(labelElements[3].nativeElement.innerHTML).toEqual(component.config.items[3].label);
    }));
});