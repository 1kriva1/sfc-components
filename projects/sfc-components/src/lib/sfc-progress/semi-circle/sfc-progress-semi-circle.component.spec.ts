import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcComponentsModule } from '../../sfc-components.module';
import { CommonConstants, ComponentSize } from '../../common/constants/common-constants';
import { SfcProgressSemiCircleComponent } from './sfc-progress-semi-circle.component';

describe('Component: SfcProgressSemiCircleComponent', () => {

    let component: SfcProgressSemiCircleComponent;
    let fixture: ComponentFixture<SfcProgressSemiCircleComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcProgressSemiCircleComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcProgressSemiCircleComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcProgressSemiCircleComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.semi-circle-progress-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.bar-overflow')).toBeDefined();
        expect(fixture.nativeElement.querySelector('span.progress-value')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.progress-limits')).toBeDefined();
    }));

    it("Size: default", async(() => {
        const progressEl = el.query(By.css('div.semi-circle-progress-container'));
        expect(progressEl.nativeElement.className).toContain(ComponentSize.Medium);
    }));

    it("Size: defined value", async(() => {
        component.size = ComponentSize.Small;
        fixture.detectChanges();

        const progressEl = el.query(By.css('div.semi-circle-progress-container'));
        expect(progressEl.nativeElement.className).toContain(component.size);
    }));

    it("Custom size: default", async(() => {
        const progressEl = el.query(By.css('div.semi-circle-progress-container'));
        expect(progressEl.styles.fontSize).toBeUndefined();
    }));

    it("Custom size: defined value", async(() => {
        component.customSize = 43;
        fixture.detectChanges();

        const progressEl = el.query(By.css('div.semi-circle-progress-container'));
        expect(progressEl.styles.fontSize).toEqual('43px');
    }));

    it("Progress bar: default styles", async(() => {
        const barEl = el.query(By.css('div.bar-overflow > .bar'));

        expect(barEl.styles.transform).toEqual(component.barStyles.transform);
        expect(barEl.styles.borderBottomColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_LOW);
        expect(barEl.styles.borderRightColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_LOW);
    }));

    it("Progress bar: first degree of default color function", async(() => {
        component.progress = 13;
        fixture.detectChanges();

        const barEl = el.query(By.css('div.bar-overflow > .bar'));
        expect(barEl.styles.transform).toEqual(component.barStyles.transform);
        expect(barEl.styles.borderBottomColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.LOW);
        expect(barEl.styles.borderRightColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.LOW);
    }));

    it("Progress bar: second degree of default color function", async(() => {
        component.progress = 25;
        fixture.detectChanges();

        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderBottomColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_LOW);
        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderRightColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_LOW);
    }));

    it("Progress bar: third degree of default color function", async(() => {
        component.progress = 37;
        fixture.detectChanges();

        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderBottomColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_MEDIUM);
        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderRightColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_MEDIUM);
    }));

    it("Progress bar: fouth degree of default color function", async(() => {
        component.progress = 49;
        fixture.detectChanges();

        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderBottomColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MEDIUM);
        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderRightColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MEDIUM);
    }));

    it("Progress bar: fifth degree of default color function", async(() => {
        component.progress = 61;
        fixture.detectChanges();

        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderBottomColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_MEDIUM);
        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderRightColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_MEDIUM);
    }));

    it("Progress bar: sixth degree of default color function", async(() => {
        component.progress = 73;
        fixture.detectChanges();

        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderBottomColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_HIGH);
        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderRightColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_HIGH);
    }));

    it("Progress bar: seventh degree of default color function", async(() => {
        component.progress = 85;
        fixture.detectChanges();

        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderBottomColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.HIGH);
        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderRightColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.HIGH);
    }));

    it("Progress bar: eighth degree of default color function", async(() => {
        component.progress = 100;
        fixture.detectChanges();

        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderBottomColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_HIGH);
        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderRightColor).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_HIGH);
    }));

    it("Progress bar: custom get color function", async(() => {
        component.getColor = (value: number) => {
            if (value < 33) {
                return 'red';
            } else if (value >= 33 && value < 66) {
                return 'yellow';
            } else if (value >= 66) {
                return 'green';
            }
        };
        component.progress = 10;
        fixture.detectChanges();

        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderBottomColor).toEqual('red');
        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderRightColor).toEqual('red');

        component.progress = 50;
        fixture.detectChanges();

        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderBottomColor).toEqual('yellow');
        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderRightColor).toEqual('yellow');

        component.progress = 80;
        fixture.detectChanges();

        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderBottomColor).toEqual('green');
        expect(el.query(By.css('div.bar-overflow > .bar')).styles.borderRightColor).toEqual('green');
    }));

    it("Progress: default", async(() => {
        const progressEl = el.query(By.css('span.progress-value'));
        expect(progressEl.nativeElement.innerText).toEqual(CommonConstants.MIN_VALUE.toString());
    }));

    it("Progress: defined value", async(() => {
        component.progress = 33;
        fixture.detectChanges();

        const progressEl = el.query(By.css('span.progress-value'));
        expect(progressEl.nativeElement.innerText).toEqual('33');
    }));

    it("Limits: default", async(() => {
        const limitsEl = el.query(By.css('div.progress-limits')),
            limitValueEls = el.queryAll(By.css('div.progress-limits > span'));

        expect(limitsEl).toBeDefined();
        expect(limitValueEls[0].nativeElement.innerText).toEqual(CommonConstants.MIN_VALUE.toString());
        expect(limitValueEls[1].nativeElement.innerText).toEqual(CommonConstants.FULL_PERCENTAGE.toString());
    }));

    it("Limits: disabled", async(() => {
        component.limits = false;
        fixture.detectChanges();

        expect(el.query(By.css('div.progress-limits'))).toBeNull();
    }));

    it("Limits: custom values", async(() => {
        component.min = 10;
        component.max = 20;
        fixture.detectChanges();

        const limitValueEls = el.queryAll(By.css('div.progress-limits > span'));

        expect(limitValueEls[0].nativeElement.innerText).toEqual(component.min.toString());
        expect(limitValueEls[1].nativeElement.innerText).toEqual(component.max.toString());
    }));
});

