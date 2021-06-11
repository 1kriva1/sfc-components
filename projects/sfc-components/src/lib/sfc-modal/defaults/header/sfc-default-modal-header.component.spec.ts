import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { CommonConstants } from '../../../common/constants/common-constants';
import { SfcDefaultModalHeaderComponent } from './sfc-default-modal-header.component';


describe('Component: SfcModal - SfcDefaultModalHeaderComponent', () => {

    let component: SfcDefaultModalHeaderComponent;
    let fixture: ComponentFixture<SfcDefaultModalHeaderComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcDefaultModalHeaderComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcDefaultModalHeaderComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Configuration: default config", async(() => {
        let iconEl = fixture.nativeElement.querySelector('i.modal-header-icon');

        expect(iconEl).toBeDefined();
        expect(iconEl.classList.length).toEqual(3);
        expect(iconEl.classList.contains('fa')).toBeTruthy();
        expect(iconEl.classList.contains('fa-window-restore')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('i.button-close.fa.fa-times').style.visibility).toEqual('visible');
        expect(fixture.nativeElement.querySelector('span.modal-header-label').innerText).toEqual(CommonConstants.DEFAULT_MODAL_HEADER_CONFIG.text);
    }));

    it("Configuration: custom config - text", async(() => {
        component.config = { text: 'TEST' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.modal-header-label').innerText).toEqual(component.config.text);
    }));

    it("Configuration: custom config - icon", async(() => {
        component.config = { icon: 'fa fa-user' };
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.modal-header-icon');

        expect(iconEl).toBeDefined();
        expect(iconEl.classList.length).toEqual(3);
        expect(iconEl.classList.contains('fa')).toBeTruthy();
        expect(iconEl.classList.contains('fa-user')).toBeTruthy();
    }));

    it("Configuration: custom config - close icon", async(() => {
        component.config = { showCloseIcon: false };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.button-close.fa.fa-times').style.visibility).toEqual('hidden');
    }));

    it('Icon: should create icon element if icon value defined in config', () => {
        component.config = { icon: 'fa fa-user' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it('Icon: CSS classes with defined icon in config', () => {
        component.config = { icon: 'fa fa-user' };
        fixture.detectChanges();

        let iconEl = fixture.nativeElement.querySelector('i.modal-header-icon');

        expect(iconEl).toBeDefined();
        expect(iconEl.classList.length).toEqual(3);
        expect(iconEl.classList.contains('fa')).toBeTruthy();
        expect(iconEl.classList.contains('fa-user')).toBeTruthy();
    });

    it("Close icon: click event", async(() => {
        spyOn<any>(component, 'onClose').and.callThrough();
        spyOn(component.closed, 'emit');

        const closeIcon = fixture.nativeElement.querySelector('.modal-header-label ~ span');
        closeIcon.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(component['onClose']).toHaveBeenCalled();
        expect(component.closed.emit).toHaveBeenCalled();
    }));
});