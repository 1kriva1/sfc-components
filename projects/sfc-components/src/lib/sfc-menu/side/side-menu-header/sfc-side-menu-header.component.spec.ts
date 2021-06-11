import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { SfcSideMenuHeaderComponent } from './sfc-side-menu-header.component';
import { CommonConstants, StyleClass } from '../../../common/constants/common-constants';
import { By } from '@angular/platform-browser';
import { SfcHamburgerComponent } from '../../../common/components/hamburger/sfc-hamburger.component';

describe('Component: SfcSideMenuHeaderComponent', () => {

    let component: SfcSideMenuHeaderComponent;
    let fixture: ComponentFixture<SfcSideMenuHeaderComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcSideMenuHeaderComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcSideMenuHeaderComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcSideMenuHeaderComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('li.side-menu-header')).toBeDefined();
        expect(fixture.nativeElement.querySelector('span.side-menu-header-title')).toBeDefined();
        expect(fixture.nativeElement.querySelector('sfc-hamburger')).toBeDefined();
    }));

    it("Label: with empty", async(() => {
        expect(fixture.nativeElement.querySelector('span.side-menu-header-title').innerText).toEqual(CommonConstants.DEFAULT_MENU_HEADER_TEXT);
    }));

    it("Label: with filled", async(() => {
        component.label = 'Test label';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.side-menu-header-title').innerText).toEqual(component.label);
    }));

    it("Hamburger: isOpen attribute", async(() => {
        expect(fixture.nativeElement.className).not.toEqual(StyleClass.Open);

        component.isOpen = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toEqual(StyleClass.Open);
        expect(el.query(By.directive(SfcHamburgerComponent)).attributes['ng-reflect-is-open']).toEqual('true');
    }));

    it("Hamburger: click event", async(() => {
        spyOn<any>(component, 'onClick').and.callThrough();
        spyOn(component.onToggle, 'emit');        

        const hamburger = el.query(By.directive(SfcHamburgerComponent));
        hamburger.triggerEventHandler('click', { target: hamburger.nativeElement });
        fixture.detectChanges();
        
        expect(component['onClick']).toHaveBeenCalled();
        expect(component.onToggle.emit).toHaveBeenCalled();
    }));
});