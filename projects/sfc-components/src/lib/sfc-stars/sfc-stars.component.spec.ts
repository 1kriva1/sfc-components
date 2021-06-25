import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../sfc-components.module';
import { CommonConstants, ComponentSize, StarTypes } from '../common/constants/common-constants';
import { By } from '@angular/platform-browser';
import { SfcStarsComponent } from './sfc-stars.component';

describe('Component: SfcStarsComponent', () => {

    let component: SfcStarsComponent;
    let fixture: ComponentFixture<SfcStarsComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcStarsComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcStarsComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Size: default", async(() => {
        expect(fixture.nativeElement.querySelector('div.stars-rating').className).toContain(ComponentSize.Medium);
    }));

    it("Size: defined", async(() => {
        component.size = ComponentSize.Large;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.stars-rating').className).toContain(ComponentSize.Large);
    }));

    it("Size: custom", async(() => {
        component.customSize = { height: 10, width: 10 };
        fixture.detectChanges();

        const starsEl = el.queryAll(By.css('div.stars-rating button'))

        starsEl.forEach(star => {
            expect(star.styles.width).toEqual("10px");
            expect(star.styles.height).toEqual("10px");
        });
    }));

    it("Count: default", async(() => {
        expect(fixture.nativeElement.querySelectorAll('div.stars-rating button').length).toEqual(CommonConstants.DEFAULT_STARS_COUNT);
    }));

    it("Count: defined", async(() => {
        component.count = 3;
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('div.stars-rating button').length).toEqual(component.count);
    }));

    it("Value: 0 (default)", async(() => {
        const starsEl = el.queryAll(By.css('div.stars-rating button'))

        starsEl.forEach(star => {
            expect(star.classes[StarTypes.None]).toBeTruthy();
        });
    }));

    it("Value: 0.1 (0.25 class)", async(() => {
        component.count = 2;
        component.value = 0.1;
        fixture.detectChanges();

        const starsEl = el.queryAll(By.css('div.stars-rating button'))

        expect(starsEl[0].classes[StarTypes.S25]).toBeTruthy();
        expect(starsEl[1].classes[StarTypes.None]).toBeTruthy();
    }));

    it("Value: 0.49 (0.25 class)", async(() => {
        component.count = 2;
        component.value = 0.49;
        fixture.detectChanges();

        const starsEl = el.queryAll(By.css('div.stars-rating button'))

        expect(starsEl[0].classes[StarTypes.S25]).toBeTruthy();
        expect(starsEl[1].classes[StarTypes.None]).toBeTruthy();
    }));

    it("Value: 0.50 (0.5 class)", async(() => {
        component.count = 2;
        component.value = 0.5;
        fixture.detectChanges();

        const starsEl = el.queryAll(By.css('div.stars-rating button'))

        expect(starsEl[0].classes[StarTypes.S50]).toBeTruthy();
        expect(starsEl[1].classes[StarTypes.None]).toBeTruthy();
    }));

    it("Value: 0.84 (0.75 class)", async(() => {
        component.count = 2;
        component.value = 0.84;
        fixture.detectChanges();

        const starsEl = el.queryAll(By.css('div.stars-rating button'))

        expect(starsEl[0].classes[StarTypes.S75]).toBeTruthy();
        expect(starsEl[1].classes[StarTypes.None]).toBeTruthy();
    }));

    it("Value: 1.84", async(() => {
        component.count = 2;
        component.value = 1.84;
        fixture.detectChanges();

        const starsEl = el.queryAll(By.css('div.stars-rating button'))

        expect(starsEl[0].classes[StarTypes.Full]).toBeTruthy();
        expect(starsEl[1].classes[StarTypes.S75]).toBeTruthy();
    }));
});