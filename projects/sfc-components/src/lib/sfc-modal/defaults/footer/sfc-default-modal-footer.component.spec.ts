import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcDefaultModalFooterComponent } from './sfc-default-modal-footer.component';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { ButtonType, StyleClass } from '../../../common/constants/common-constants';


describe('Component: SfcModal - SfcDefaultModalFooterComponent', () => {

    let component: SfcDefaultModalFooterComponent;
    let fixture: ComponentFixture<SfcDefaultModalFooterComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcDefaultModalFooterComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcDefaultModalFooterComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Configuration: default config", async(() => {
        expect(fixture.nativeElement.querySelector('sfc-button.button-cancel')).toBeDefined();
        expect(fixture.nativeElement.querySelector('sfc-button.button-ok')).toBeDefined();
    }));

    it("Configuration: custom config - only cancel button", async(() => {
        component.config = { cancelButton: true, okButton: false };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-button.button-cancel')).toBeDefined();
        expect(fixture.nativeElement.querySelector('sfc-button.button-ok')).toBeNull();
    }));

    it("Configuration: custom config - only ok button", async(() => {
        component.config = { okButton: true };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-button.button-cancel')).toBeNull();
        expect(fixture.nativeElement.querySelector('sfc-button.button-ok')).toBeDefined();
    }));

    it("Configuration: custom config - no buttons", async(() => {
        component.config = {};
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-button.button-cancel')).toBeNull();
        expect(fixture.nativeElement.querySelector('sfc-button.button-ok')).toBeNull();
    }));

    it("Buttons: cancel button", async(() => {
        const cancelBtn = el.query(By.css('sfc-button.button-cancel')),
            buttonInnerEl = cancelBtn.query(By.css('a.' + ButtonType.Rounded));
        expect(cancelBtn.attributes.text).toEqual('Cancel');
        expect(buttonInnerEl).toBeDefined();
        expect(buttonInnerEl.componentInstance.customSize).toEqual({ width: 80, height: 30 });
    }));

    it("Buttons: cancel button click (default)", async(() => {
        spyOn<any>(component, 'onCancel').and.callThrough();
        spyOn(component.closed, 'emit');

        const cancelBtn = el.query(By.css('sfc-button.button-cancel'));
        cancelBtn.nativeElement.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(component['onCancel']).toHaveBeenCalled();
        expect(component.closed.emit).toHaveBeenCalled();
    }));

    it("Buttons: cancel button click (config)", async(() => {
        component.config = {cancelButton: true, onCancel:()=>{}};
        fixture.detectChanges();

        spyOn<any>(component, 'onCancel').and.callThrough();
        spyOn(component.closed, 'emit');
        spyOn(component.config, 'onCancel');

        const cancelBtn = el.query(By.css('sfc-button.button-cancel'));
        cancelBtn.nativeElement.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(component['onCancel']).toHaveBeenCalled();
        expect(component.closed.emit).not.toHaveBeenCalled();
        expect(component.config.onCancel).toHaveBeenCalled();
    }));

    it("Buttons: ok button", async(() => {
        const okBtn = el.query(By.css('sfc-button.button-ok')),
            buttonInnerEl = okBtn.query(By.css('a.' + ButtonType.Rounded));
        expect(okBtn.attributes.text).toEqual('Ok');
        expect(buttonInnerEl).toBeDefined();
        expect(buttonInnerEl.componentInstance.customSize).toEqual({ width: 80, height: 30 });
    }));

    it("Buttons: ok button click (default)", async(() => {
        spyOn<any>(component, 'onOk').and.callThrough();
        spyOn(component.ok, 'emit');

        const okBtn = el.query(By.css('sfc-button.button-ok'));
        okBtn.nativeElement.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(component['onOk']).toHaveBeenCalled();
        expect(component.ok.emit).toHaveBeenCalled();
    }));

    it("Buttons: ok button click (config)", async(() => {
        component.config = {okButton: true, onOk:()=>{}};
        fixture.detectChanges();

        spyOn<any>(component, 'onOk').and.callThrough();
        spyOn(component.ok, 'emit');
        spyOn(component.config, 'onOk');

        const okBtn = el.query(By.css('sfc-button.button-ok'));
        okBtn.nativeElement.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(component['onOk']).toHaveBeenCalled();
        expect(component.ok.emit).not.toHaveBeenCalled();
        expect(component.config.onOk).toHaveBeenCalled();
    }));
});