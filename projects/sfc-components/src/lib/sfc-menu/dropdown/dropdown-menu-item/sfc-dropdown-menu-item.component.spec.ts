import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { SfcDropdownMenuItemComponent } from './sfc-dropdown-menu-item.component';

describe('Component: SfcDropdownMenuItemComponent', () => {

    let component: SfcDropdownMenuItemComponent;
    let fixture: ComponentFixture<SfcDropdownMenuItemComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcDropdownMenuItemComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcDropdownMenuItemComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcDropdownMenuItemComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('li')).toBeDefined();
        expect(fixture.nativeElement.querySelector('li a')).toBeDefined();
    }));

    it("Icon: without icon", async(() => {
        const iconEl = fixture.nativeElement.querySelector('li i');
        expect(iconEl).toBeNull();
    }));

    it("Icon: with icon", async(() => {
        component.item = { icon: 'fa fa-test' };
        fixture.detectChanges();

        const iconEl = fixture.nativeElement.querySelector('li i');

        expect(iconEl.className).toContain('fa');
        expect(iconEl.className).toContain('fa-test');
    }));

    it("Icon: styles", async(() => {
        component.item = { icon: 'fa fa-test' };
        fixture.detectChanges();

        const iconEl = fixture.nativeElement.querySelector('li i');

        expect(iconEl.style['paddingRight']).toEqual('10px');
        expect(iconEl.style['width']).toEqual('10%');
    }));

    it("Label: empty value", async(() => {
        const labelEl = fixture.nativeElement.querySelector('li a');
        expect(labelEl.innerText).toEqual('');
    }));

    it("Label: not empty value", async(() => {
        component.item = { label: 'test value' };
        fixture.detectChanges();
        
        const labelEl = fixture.nativeElement.querySelector('li a');

        expect(labelEl.innerText).toEqual(component.item.label);
    }));

    it("Delimeter: not exist", async(() => {
        const delimeterEl = fixture.nativeElement.querySelector('sfc-delimeter');
        expect(delimeterEl).toBeNull();
    }));

    it("Delimeter: exist", async(() => {
        component.item = { delimeter: true };
        fixture.detectChanges();

        const delimeterEl = fixture.nativeElement.querySelector('sfc-delimeter');
        expect(delimeterEl).toBeDefined();
    }));
});