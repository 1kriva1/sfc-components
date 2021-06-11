import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { SfcHamburgerComponent } from './sfc-hamburger.component';
import { StyleClass } from '../../constants/common-constants';

describe('Component: SfcHamburgerComponent', () => {

    let component: SfcHamburgerComponent;
    let fixture: ComponentFixture<SfcHamburgerComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcHamburgerComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcHamburgerComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcHamburgerComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.hamburger-container')).toBeDefined();
        expect(fixture.nativeElement.querySelectorAll('div.hamburger-container div.hamburger-line').length).toEqual(3);
        expect(fixture.nativeElement.querySelector('div.hamburger-container > div.hamburger-line.half.start')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.hamburger-container > div.hamburger-line.half.end')).toBeDefined();
    }));

    it("SfcHamburgerComponent: isOpen property is false", async(() => {
        expect(fixture.nativeElement.className).not.toEqual(StyleClass.Open);
    }));

    it("SfcHamburgerComponent: isOpen property is true", async(() => {
        component.isOpen = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toEqual(StyleClass.Open);
    }));
});