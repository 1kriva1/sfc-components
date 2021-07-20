import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcComponentsModule } from '../../sfc-components.module';
import { CommonConstants, ComponentSize } from '../../common/constants/common-constants';
import { SfcProgressCircleComponent } from './sfc-progress-circle.component';

describe('Component: SfcProgressCircleComponent', () => {

    let component: SfcProgressCircleComponent;
    let fixture: ComponentFixture<SfcProgressCircleComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcProgressCircleComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcProgressCircleComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcProgressCircleComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.circle-progress-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.circle-progress-container > span')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.slice')).toBeDefined();
    }));

    it("Size: default", async(() => {
        const progressEl = el.query(By.css('div.circle-progress-container'));
        expect(progressEl.nativeElement.className).toContain(ComponentSize.Medium);
    }));

    it("Size: defined value", async(() => {
        component.size = ComponentSize.Small;
        fixture.detectChanges();

        const progressEl = el.query(By.css('div.circle-progress-container'));
        expect(progressEl.nativeElement.className).toContain(component.size);
    }));

    it("Custom size: default", async(() => {
        const progressEl = el.query(By.css('div.circle-progress-container'));
        expect(progressEl.styles.fontSize).toBeUndefined();
    }));

    it("Custom size: defined value", async(() => {
        component.customSize = 43;
        fixture.detectChanges();

        const progressEl = el.query(By.css('div.circle-progress-container'));
        expect(progressEl.styles.fontSize).toEqual('43px');
    }));

    it("Progress: default", async(() => {
        const progressEl = el.query(By.css('div.circle-progress-container > span'));
        expect(progressEl.nativeElement.innerText).toEqual(CommonConstants.MIN_VALUE.toString());
    }));

    it("Progress: defined value", async(() => {
        component.progress = 33;
        fixture.detectChanges();

        const progressEl = el.query(By.css('div.circle-progress-container > span'));
        expect(progressEl.nativeElement.innerText).toEqual('33');
    }));

    it("Slice: not more than 50", async(() => {
        component.progress = 50;
        fixture.detectChanges();

        const progressEl = el.query(By.css('div.slice'));
        expect(progressEl.nativeElement.className).not.toContain('reversed');
    }));

    it("Slice: more than 50", async(() => {
        component.progress = 51;
        fixture.detectChanges();

        const progressEl = el.query(By.css('div.slice'));
        expect(progressEl.nativeElement.className).toContain('reversed');
    }));

    it("Progress bar: default styles", async(() => {
        const barEl = el.query(By.css('div.slice > .bar')),
            fillEl = el.query(By.css('div.slice > .fill'));
        expect(barEl.styles.transform).toEqual(component.transformRotate);
        expect(barEl.styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_LOW);
        expect(fillEl.styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_LOW);
    }));

    it("Progress bar: first degree of default color function", async(() => {
        component.progress = 13;
        fixture.detectChanges();

        const barEl = el.query(By.css('div.slice > .bar')),
            fillEl = el.query(By.css('div.slice > .fill'));
        expect(barEl.styles.transform).toEqual(component.transformRotate);
        expect(barEl.styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.LOW);
        expect(fillEl.styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.LOW);
    }));

    it("Progress bar: second degree of default color function", async(() => {
        component.progress = 25;
        fixture.detectChanges();

        expect(el.query(By.css('div.slice > .bar')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_LOW);
        expect(el.query(By.css('div.slice > .fill')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_LOW);
    }));

    it("Progress bar: third degree of default color function", async(() => {
        component.progress = 37;
        fixture.detectChanges();

        expect(el.query(By.css('div.slice > .bar')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_MEDIUM);
        expect(el.query(By.css('div.slice > .fill')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_MEDIUM);
    }));

    it("Progress bar: fouth degree of default color function", async(() => {
        component.progress = 49;
        fixture.detectChanges();

        expect(el.query(By.css('div.slice > .bar')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MEDIUM);
        expect(el.query(By.css('div.slice > .fill')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MEDIUM);
    }));

    it("Progress bar: fifth degree of default color function", async(() => {
        component.progress = 61;
        fixture.detectChanges();

        expect(el.query(By.css('div.slice > .bar')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_MEDIUM);
        expect(el.query(By.css('div.slice > .fill')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_MEDIUM);
    }));

    it("Progress bar: sixth degree of default color function", async(() => {
        component.progress = 73;
        fixture.detectChanges();

        expect(el.query(By.css('div.slice > .bar')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_HIGH);
        expect(el.query(By.css('div.slice > .fill')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_HIGH);
    }));

    it("Progress bar: seventh degree of default color function", async(() => {
        component.progress = 85;
        fixture.detectChanges();

        expect(el.query(By.css('div.slice > .bar')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.HIGH);
        expect(el.query(By.css('div.slice > .fill')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.HIGH);
    }));

    it("Progress bar: eighth degree of default color function", async(() => {
        component.progress = 100;
        fixture.detectChanges();

        expect(el.query(By.css('div.slice > .bar')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_HIGH);
        expect(el.query(By.css('div.slice > .fill')).styles['border-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_HIGH);
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

        expect(el.query(By.css('div.slice > .bar')).styles['border-color']).toEqual('red');
        expect(el.query(By.css('div.slice > .fill')).styles['border-color']).toEqual('red');

        component.progress = 50;
        fixture.detectChanges();

        expect(el.query(By.css('div.slice > .bar')).styles['border-color']).toEqual('yellow');
        expect(el.query(By.css('div.slice > .fill')).styles['border-color']).toEqual('yellow');

        component.progress = 80;
        fixture.detectChanges();

        expect(el.query(By.css('div.slice > .bar')).styles['border-color']).toEqual('green');
        expect(el.query(By.css('div.slice > .fill')).styles['border-color']).toEqual('green');
    }));
});

