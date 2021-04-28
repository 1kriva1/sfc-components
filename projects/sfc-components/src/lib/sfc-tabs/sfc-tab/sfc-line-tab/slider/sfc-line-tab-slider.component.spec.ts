import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcLineTabSliderComponent } from './sfc-line-tab-slider.component';
import { SfcComponentsModule } from 'projects/sfc-components/src/lib/sfc-components.module';

describe('Component: SfcLineTabSliderComponent', () => {

    let component: SfcLineTabSliderComponent;
    let fixture: ComponentFixture<SfcLineTabSliderComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcLineTabSliderComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcLineTabSliderComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Width: when length not defined", async(() => {
        const slider = fixture.nativeElement.querySelector('.slider');
        expect(slider.style.width).toEqual('calc(100%)');
    }));

    it("Width: whith defined length", async(() => {
        component.length = 4;
        fixture.detectChanges();

        const slider = fixture.nativeElement.querySelector('.slider');
        expect(slider.style.width).toEqual('calc(25%)');
    }));

    it("Left: when length not defined", async(() => {
        const slider = fixture.nativeElement.querySelector('.slider');
        expect(slider.style.left).toEqual('calc(0%)');
    }));

    it("Left: when selectedIndex not defined", async(() => {
        const slider = fixture.nativeElement.querySelector('.slider');
        expect(slider.style.left).toEqual('calc(0%)');
    }));

    it("Left: when selectedIndex and length defined", async(() => {
        component.length = 4;
        component.selectedIndex = 2;
        fixture.detectChanges();

        const slider = fixture.nativeElement.querySelector('.slider');
        expect(slider.style.left).toEqual('calc(50%)');
    }));
});