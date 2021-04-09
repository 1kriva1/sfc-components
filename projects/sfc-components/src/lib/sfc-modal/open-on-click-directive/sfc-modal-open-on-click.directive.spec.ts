import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AfterViewInit, Component, DebugElement, ElementRef, forwardRef, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SfcModalOpenOnClickDirective } from './sfc-modal-open-on-click.directive';
import { SfcModalService } from '../modal-service/sfc-modal.service';
import { SfcComponentsModule } from '../../sfc-components.module';


class Test {
    getRefTemp() {

    }
}

@Component({
    template: `<button id="button1" #button1 >Modal Button 1</button>             
               <div [modal-open-on-click]="[button1]">
                    <ng-template #modal>
                        <h1>Template content</h1>
                    </ng-template>
                </div>
                `
})
class TestSfcModalOpenOnClickComponent implements AfterViewInit {

    @ViewChild(SfcModalOpenOnClickDirective, { static: false })
    directive: SfcModalOpenOnClickDirective;

    @ViewChild('modal', { static: false })
    modalTemplateRef;

    ngAfterViewInit() {
        console.log('child', this.modalTemplateRef);
    }
}

describe('Directive: SfcModalOpenOnClickDirective', () => {

    let component: TestSfcModalOpenOnClickComponent;
    let fixture: ComponentFixture<TestSfcModalOpenOnClickComponent>;

    let el: DebugElement;
    let userServiceSpy = jasmine.createSpy('TemplateRef');

    beforeEach(async(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [SfcModalOpenOnClickDirective, TestSfcModalOpenOnClickComponent],
            providers: [
                SfcModalService,
                {
                    provide: TemplateRef,
                    useFactory: userServiceSpy
                }
            ]
        }).createComponent(TestSfcModalOpenOnClickComponent);
        
        fixture.detectChanges();
        el = fixture.debugElement;
        component = fixture.componentInstance;
    }));

    xit('SfcModalOpenOnClickDirective: Should create directive', () => {
        userServiceSpy.and.returnValue(component.modalTemplateRef);
        fixture.detectChanges();

        const buttonMultiple = el.query(By.css('#button1'));
        buttonMultiple.nativeElement.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(component.directive).toBeDefined();
    });

    xit('Elements: click on single button', () => {
        // const buttonSingle = el.query(By.css('#button2'));
        // buttonSingle.nativeElement.dispatchEvent(new MouseEvent('click', {}));
        // fixture.detectChanges();

        expect(el.query(By.css('#content-2'))).toBeDefined();
    });

    xit('Elements: click on multiple button', () => {
        const buttonMultiple = el.query(By.css('#button1'));
        buttonMultiple.nativeElement.dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(el.query(By.css('#content-1'))).toBeDefined();
        expect(el.query(By.css('#content-2'))).toBeDefined();
    });

});