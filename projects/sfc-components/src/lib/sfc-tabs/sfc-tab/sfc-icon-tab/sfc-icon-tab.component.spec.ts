import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from 'projects/sfc-components/src/lib/sfc-components.module';
import { By } from '@angular/platform-browser';
import { SfcIconTabComponent } from './sfc-icon-tab.component';
import { CommonConstants } from '../../../common/constants/common-constants';

describe('Component: SfcIconTabComponent', () => {

    let component: SfcIconTabComponent;
    let fixture: ComponentFixture<SfcIconTabComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcIconTabComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcIconTabComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Selected: when not selected", async(() => {
        expect(fixture.nativeElement.querySelector('.selected')).toBeNull();
    }));

    it("Selected: when selected", async(() => {
        component.selected = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.selected')).toBeDefined();
    }));

    it("Input: should create element", async(() => {
        expect(fixture.nativeElement.querySelector('input[type=radio]')).toBeDefined();
    }));

    it("Input Id: when id not defined", async(() => {
        const input = fixture.nativeElement.querySelector('input[type=radio]');
        expect(input.id).toEqual('sfc-line-tab-');
    }));

    it("Input Id: when id defined", async(() => {
        component.id = 'test';
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input[type=radio]');
        expect(input.id).toEqual('sfc-line-tab-' + component.id);
    }));

    it("Input checked: when not checked", async(() => {
        expect(fixture.nativeElement.querySelector('input[type=radio]:checked')).toBeNull();
    }));

    it("Input checked: when checked", async(() => {
        component.selected = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio]:checked')).toBeDefined();
    }));

    it("Input disabled: when not disabled", async(() => {
        expect(fixture.nativeElement.querySelector('input[type=radio]:disabled')).toBeNull();
    }));

    it("Input disabled: when disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio]:disabled')).toBeDefined();
    }));

    it("Input change event: when not change", async(() => {
        spyOn(component.onSelect, 'emit');
        expect(component.onSelect.emit).not.toHaveBeenCalled();
    }));

    it("Input change event: when change", async(() => {
        spyOn(component.onSelect, 'emit');

        const input = el.query(By.css('input[type=radio]'));
        input.triggerEventHandler('change', { target: input.nativeElement });
        fixture.detectChanges();

        expect(component.onSelect.emit).toHaveBeenCalledTimes(1);
    }));

    it("Input change event: when change with defined Id", async(() => {
        spyOn(component.onSelect, 'emit');
        component.id = 'test';
        fixture.detectChanges();

        const input = el.query(By.css('input[type=radio]'));
        input.triggerEventHandler('change', { target: input.nativeElement });
        fixture.detectChanges();

        expect(component.onSelect.emit).toHaveBeenCalledWith(component.id);
    }));

    it("Label: should create element", async(() => {
        expect(fixture.nativeElement.querySelector('label')).toBeDefined();
    }));

    it("Label: label should be linked to input element", () => {
        const input = fixture.nativeElement.querySelector('input[type=radio]');

        expect(input.labels).toBeDefined();
        expect(input.labels.length).toEqual(1);
        expect(input.labels[0].htmlFor).toEqual(input.id);
    });

    it("Label: default inner text value", () => {
        expect(fixture.nativeElement.querySelector('label').innerText).toEqual('');
    });

    it("Label: inner text value", () => {
        const labelAssertValue = 'test label';
        component.title = labelAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
    });

    it("Label: when title not defined. but id is defined", () => {
        component.id = 'test';
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('label').innerText).toEqual('test');
    });

    it("Icon: created with default if icon value not defined", () => {
        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon).toBeDefined();
        expect(icon.className).toEqual('icon ' + CommonConstants.TAB_DEFAULT_ICON);
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it("Icon: should add class to icon element", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
    });
});