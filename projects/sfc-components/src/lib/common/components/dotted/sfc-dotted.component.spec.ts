import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { SfcDottedComponent } from './sfc-dotted.component';
import { DottedType } from '../../constants/common-constants';

describe('Component: SfcDottedComponent', () => {

    let component: SfcDottedComponent;
    let fixture: ComponentFixture<SfcDottedComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcDottedComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcDottedComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcDottedComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.dot-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.circle-container')).toBeDefined();
        expect(fixture.nativeElement.querySelectorAll('div.circle').length).toEqual(3);
    }));

    it("Active: on/off", async(() => {
        expect(fixture.nativeElement.querySelector('div.dot-container.active')).toBeNull();

        component.active = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.dot-container.active')).toBeDefined();

        component.active = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.dot-container.active')).toBeNull();
    }));

    it("Position: horizontal/vertical", async(() => {
        expect(el.nativeElement.className).toContain(DottedType.Horizontal);
        expect(el.nativeElement.className).not.toContain(DottedType.Vertical);

        component.position = DottedType.Vertical;
        fixture.detectChanges();

        expect(el.nativeElement.className).toContain(DottedType.Vertical);
        expect(el.nativeElement.className).not.toContain(DottedType.Horizontal);
    }));

    it("Animated: on/off", async(() => {
        expect(fixture.nativeElement.querySelector('div.dot-container.animated')).toBeDefined();

        component.animated = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.dot-container.animated')).toBeNull();

        component.animated = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.dot-container.animated')).toBeDefined();
    }));
});

