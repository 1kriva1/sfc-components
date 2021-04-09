import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcModalComponent } from './sfc-modal.component';
import { SfcComponentsModule } from '../sfc-components.module';
import { SfcModalService } from './modal-service/sfc-modal.service';
import { CommonConstants, StyleClass } from '../common/constants/common-constants';

@Component({
    template: `<ng-template #headerRef>
                    <h1>HeaderRef</h1>
                </ng-template>  
                
                <ng-template #bodyRef>
                    <h1>BodyRef</h1>
                </ng-template>  
                
                <ng-template #footerRef>
                    <h1>FooterRef</h1>
                </ng-template>

               <sfc-modal>

                <div *ngIf="showContent" header>
                    <h2>HeaderContent</h2>
                </div>

                <div *ngIf="showContent" body>
                    <h2>BodyContent</h2>
                </div>

                <div *ngIf="showContent" footer>
                    <h2>FooterContent</h2>
                </div>

               </sfc-modal>`
})
class TestSfcModalComponent {
    @ViewChild(SfcModalComponent, { static: false })
    modal: SfcModalComponent;

    @ViewChild('headerRef', { static: false })
    headerTemplateRef: TemplateRef<any>;

    @ViewChild('bodyRef', { static: false })
    bodyTemplateRef: TemplateRef<any>;

    @ViewChild('footerRef', { static: false })
    footerTemplateRef: TemplateRef<any>;

    showContent: boolean = false;
}

describe('Component: SfcModalComponent', () => {

    let component: TestSfcModalComponent;
    let fixture: ComponentFixture<TestSfcModalComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [TestSfcModalComponent],
            providers: [
                SfcModalService
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TestSfcModalComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcModalComponent: Should create component", async(() => {
        expect(component.modal).toBeTruthy();
    }));

    it("SfcModalComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('.modal-overlay')).toBeDefined();
        expect(fixture.nativeElement.querySelector('.modal-content')).toBeDefined();
    }));

    it("Overlay: click event", async(() => {
        spyOn<any>(component.modal, 'close').and.callThrough();
        const modalService = fixture.debugElement.injector.get(SfcModalService);
        spyOn(modalService, 'close').and.callThrough();

        const overlayEl = fixture.nativeElement.querySelector('.modal-overlay');
        overlayEl.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        // TODO
        setTimeout(() => {
            expect(overlayEl.parentElement.classList.contains(StyleClass.Hided)).toBeTruthy();
            expect(modalService.close).toHaveBeenCalledTimes(1);
        }, 2000);

        expect(overlayEl.parentElement.classList.contains(StyleClass.Hided)).toBeTruthy();
        expect(component.modal['close']).toHaveBeenCalled();
    }));

    it("Overlay: click event when hideOnClickOutside is False", async(() => {
        spyOn<any>(component.modal, 'close').and.callThrough();
        const modalService = fixture.debugElement.injector.get(SfcModalService);
        spyOn(modalService, 'close').and.callThrough();

        component.modal.hideOnClickOutside = false;
        fixture.detectChanges();

        const overlayEl = fixture.nativeElement.querySelector('.modal-overlay');
        overlayEl.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        // TODO
        setTimeout(() => {
            expect(overlayEl.parentElement.classList.contains(StyleClass.Hided)).toBeFalsy();
            expect(modalService.close).not.toHaveBeenCalled();
        }, 1000);

        expect(overlayEl.parentElement.classList.contains(StyleClass.Hided)).toBeFalsy();
        expect(component.modal['close']).not.toHaveBeenCalled();
    }));

    it("Content: click event", async(() => {
        spyOn<any>(component.modal, 'cancelClick').and.callThrough();

        fixture.nativeElement.querySelector('.modal-content').dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(component.modal['cancelClick']).toHaveBeenCalledTimes(1);
    }));

    it("Close event: on Esc", async(() => {
        spyOn<any>(component.modal, 'close').and.callThrough();

        const event = new KeyboardEvent("keyup", {
            "key": "Esc"
        });
        window.dispatchEvent(event);

        expect(component.modal['close']).toHaveBeenCalled();
    }));

    it("Close event: on Esc when hideOnEsc is False", async(() => {
        spyOn<any>(component.modal, 'close').and.callThrough();
        component.modal.hideOnEsc = false;
        fixture.detectChanges();

        const event = new KeyboardEvent("keyup", {
            "key": "Esc"
        });
        window.dispatchEvent(event);

        expect(component.modal['close']).not.toHaveBeenCalled();
    }));

    it("Header: with defined template reference", async(() => {
        component.modal.header = component.headerTemplateRef;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.modal-header h1')).toBeDefined();
    }));

    it("Header: with content", async(() => {
        component.showContent = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.modal-header .content-template div h2')).toBeDefined();
    }));

    it("Header: with default", async(() => {
        expect(fixture.nativeElement.querySelector('sfc-default-modal-header')).toBeDefined();
        expect(fixture.nativeElement.querySelector('sfc-default-modal-header .button-close').style.visibility).toEqual('visible');
    }));

    it("Header: with default when defaultHeader is False", async(() => {
        component.modal.defaultHeader = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-default-modal-header')).toBeNull();
    }));

    it("Header: with default component and custom config", async(() => {
        component.modal.defaultHeaderConfig = { showCloseIcon: false };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-default-modal-header')).toBeDefined();
        expect(fixture.nativeElement.querySelector('sfc-default-modal-header .button-close').style.visibility).toEqual('hidden');
    }));

    it("Header: with default - close event", async(() => {
        spyOn<any>(component.modal, 'close').and.callThrough();

        const closeIcon = fixture.nativeElement.querySelector('i.button-close.fa.fa-times');
        closeIcon.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(component.modal['close']).toHaveBeenCalled();
    }));

    it("Body: with defined template reference", async(() => {
        component.modal.body = component.bodyTemplateRef;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.modal-body h1').innerText).toBeDefined();
    }));

    it("Body: with content", async(() => {
        component.showContent = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.modal-body h2')).toBeDefined();
    }));

    it("Footer: with defined template reference", async(() => {
        component.modal.footer = component.footerTemplateRef;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.modal-footer h1')).toBeDefined();
    }));

    it("Footer: with content", async(() => {
        component.showContent = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.modal-footer .content-template div h2')).toBeDefined();
    }));

    it("Footer: with default", async(() => {
        expect(fixture.nativeElement.querySelector('sfc-default-modal-footer')).toBeDefined();
        expect(fixture.nativeElement.querySelector('sfc-default-modal-footer sfc-button.button-cancel')).toBeDefined();
    }));

    it("Footer: with default when defaultFooter is False", async(() => {
        component.modal.defaultFooter = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-default-modal-footer')).toBeNull();
    }));

    it("Footer: with default component and custom config", async(() => {
        component.modal.defaultFooterConfig = { cancelButton: false, okButton: true };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-default-modal-header')).toBeDefined();
        expect(fixture.nativeElement.querySelector('sfc-default-modal-footer sfc-button.button-cancel')).toBeNull();
        expect(fixture.nativeElement.querySelector('sfc-default-modal-footer sfc-button.button-ok')).toBeDefined();
    }));

    it("Footer: with default - close event", async(() => {
        spyOn<any>(component.modal, 'close').and.callThrough();

        const closeButton = fixture.nativeElement.querySelector('sfc-default-modal-footer sfc-button.button-cancel');
        closeButton.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(component.modal['close']).toHaveBeenCalled();
    }));
});