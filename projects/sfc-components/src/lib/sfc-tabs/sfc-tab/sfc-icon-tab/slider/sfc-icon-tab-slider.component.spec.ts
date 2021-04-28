import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from 'projects/sfc-components/src/lib/sfc-components.module';
import { SfcIconTabSliderComponent } from './sfc-icon-tab-slider.component';

describe('Component: SfcIconTabSliderComponent', () => {

    let component: SfcIconTabSliderComponent;
    let fixture: ComponentFixture<SfcIconTabSliderComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcIconTabSliderComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcIconTabSliderComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Indicator: Should create component", async(() => {
        expect(fixture.nativeElement.querySelector('.indicator')).toBeDefined();
    }));

    it("Width: when length not defined", async(() => {
        const slider = fixture.nativeElement.querySelector('.slider');
        expect(slider.style.width).toEqual('calc(100%)')
    }));

    it("Width: whith defined length", async(() => {
        component.length = 4;
        fixture.detectChanges();

        const slider = fixture.nativeElement.querySelector('.slider');
        expect(slider.style.width).toEqual('calc(25%)')
    }));

    it("Transform: when selectedIndex not defined", async(() => {
        const slider = fixture.nativeElement.querySelector('.slider');
        expect(slider.style.transform).toEqual('translateX(0%)')
    }));

    it("Transform: when selectedIndex defined", async(() => {
        component.selectedIndex = 4;
        fixture.detectChanges();

        const slider = fixture.nativeElement.querySelector('.slider');
        expect(slider.style.transform).toEqual('translateX(400%)')
    }));
});