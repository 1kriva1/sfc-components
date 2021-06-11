import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { SfcSideMenuTitleComponent } from './sfc-side-menu-title.component';
import { StyleClass } from '../../../common/constants/common-constants';

describe('Component: SfcSideMenuTitleComponent', () => {

    let component: SfcSideMenuTitleComponent;
    let fixture: ComponentFixture<SfcSideMenuTitleComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcSideMenuTitleComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcSideMenuTitleComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcSideMenuTitleComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('hr.main-hr')).toBeDefined();
        expect(fixture.nativeElement.querySelector('li.side-menu-title')).toBeDefined();
    }));

    it("Label: with empty", async(() => {
        expect(fixture.nativeElement.querySelector('li.side-menu-title').innerText).toEqual('');
    }));

    it("Label: with filled", async(() => {
        component.label = 'Test label';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('li.side-menu-title').innerText).toEqual(component.label.toLocaleUpperCase());
    }));

    it("Is Open: isOpen parameter toggling", async(() => {
        expect(fixture.nativeElement.className).not.toEqual(StyleClass.Open);

        component.isOpen = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toEqual(StyleClass.Open);
    }));
});