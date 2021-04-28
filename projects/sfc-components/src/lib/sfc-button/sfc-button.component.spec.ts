import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ButtonComponent } from './sfc-button.component';
import { SfcComponentsModule } from '../sfc-components.module';
import { ButtonType, CommonConstants, ComponentSize, StyleClass } from '../common/constants/common-constants';
import { UIUtils } from '../common/utils/ui-utils';

describe('Component: Button', () => {

    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ButtonComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("ButtonComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Id: without id", async(() => {
        const button = fixture.nativeElement.querySelector('a');
        expect(button.id).toEqual('sfc-');
    }));

    it("Id: with defined id", async(() => {
        component.id = 'test-id';
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('a');
        expect(button.id).toEqual('sfc-' + component.id);
    }));

    it("Classes: permanent class - 'sfc-button'", async(() => {
        const button = fixture.nativeElement.querySelector('a');
        expect(button.className).toContain('sfc-button');
    }));

    it("Classes: when not disabled", async(() => {
        const button = fixture.nativeElement.querySelector('a');
        expect(button.className).not.toContain(StyleClass.Disabled);
    }));

    it("Classes: when disabled", async(() => {
        component.disabled = true;
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('a');
        expect(button.className).toContain(StyleClass.Disabled);
    }));

    it("Classes: default size class", async(() => {
        const button = fixture.nativeElement.querySelector('a');
        expect(button.className).toContain(ComponentSize.Medium);
    }));

    it("Classes: with custom size class", async(() => {
        component.customSize = { height: 10, width: 10 };
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('a');
        expect(button.className).not.toContain(ComponentSize.Medium);
    }));

    it("Classes: defined size class", async(() => {
        component.size = ComponentSize.Large;
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('a');
        expect(button.className).toContain(ComponentSize.Large);
    }));

    it("Classes: without custom types", async(() => {
        const button = fixture.nativeElement.querySelector('a');
        expect(button.className).toContain(ButtonType.Bordered);
    }));

    it("Classes: with custom type", async(() => {
        component.types = [ButtonType.Filled];
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('a');
        expect(button.className).not.toContain(ButtonType.Bordered);
        expect(button.className).toContain(ButtonType.Filled);
    }));

    it("Classes: with several custom types", async(() => {
        component.types = [ButtonType.Filled, ButtonType.Rounded];
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('a');
        expect(button.className).toContain(ButtonType.Rounded);
        expect(button.className).toContain(ButtonType.Filled);
    }));

    it("Styles: without custom size", async(() => {
        const button = fixture.nativeElement.querySelector('a');

        expect(button.offsetWidth).toEqual(78);
        expect(button.offsetHeight).toEqual(30);
    }));

    it("Styles: with custom size", async(() => {
        component.customSize = { height: 30, width: 12 };
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('a');

        expect(button.style.width).toEqual(UIUtils.getCssLikePx(12));
        expect(button.style.height).toEqual(UIUtils.getCssLikePx(30));
    }));

    it("Icons: without before icon", async(() => {
        const iconBefore = fixture.nativeElement.querySelector('i.icon.before');
        expect(iconBefore).toBeNull();
    }));

    it("Icons: with before icon", async(() => {
        component.iconBefore = 'fa fa-test';
        fixture.detectChanges();

        const iconBefore = fixture.nativeElement.querySelector('i.icon.before');

        expect(iconBefore.className).toContain('icon');
        expect(iconBefore.className).toContain('fa');
        expect(iconBefore.className).toContain('fa-test');
    }));

    it("Icons: without after icon", async(() => {
        const iconAfter = fixture.nativeElement.querySelector('i.icon.after');
        expect(iconAfter).toBeNull();
    }));

    it("Icons: with after icon", async(() => {
        component.iconAfter = 'fa fa-test';
        fixture.detectChanges();

        const iconAfter = fixture.nativeElement.querySelector('i.icon.after');

        expect(iconAfter.className).toContain('icon');
        expect(iconAfter.className).toContain('fa');
        expect(iconAfter.className).toContain('fa-test');
    }));

    it("Icons: with before and after icon", async(() => {
        component.iconAfter = 'fa fa-test';
        component.iconBefore = 'fa fa-test';
        fixture.detectChanges();

        const iconBefore = fixture.nativeElement.querySelector('i.icon.before'),
            iconAfter = fixture.nativeElement.querySelector('i.icon.after');

        expect(iconBefore).toBeDefined();
        expect(iconAfter).toBeDefined();
    }));

    it("Text: without custom text", async(() => {
        const buttonText = fixture.nativeElement.querySelector('span.button-text');
        expect(buttonText.innerText).toEqual(CommonConstants.BUTTON_DEFAULT_TEXT);
    }));

    it("Text: with custom text", async(() => {
        component.text = 'Custom button';
        fixture.detectChanges();

        const buttonText = fixture.nativeElement.querySelector('span.button-text');
        expect(buttonText.innerText).toEqual(component.text);
    }));

    it("Text: with custom empty text", async(() => {
        component.text = '';
        fixture.detectChanges();

        const buttonText = fixture.nativeElement.querySelector('span.button-text');
        expect(buttonText.innerText).toEqual('');
    }));
});