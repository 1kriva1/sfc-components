import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcProgressLineComponent } from './sfc-progress-line.component';
import { SfcComponentsModule } from '../../sfc-components.module';
import { CommonConstants } from '../../common/constants/common-constants';

describe('Component: SfcProgressLineComponent', () => {

    let component: SfcProgressLineComponent;
    let fixture: ComponentFixture<SfcProgressLineComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcProgressLineComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcProgressLineComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcProgressLineComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.info')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.progress')).toBeDefined();
    }));

    it("Info: information at the start not defined", async(() => {
        expect(fixture.nativeElement.querySelector('span.start').innerText).toEqual('');
    }));

    it("Info: information at the start defined", async(() => {
        component.infoStart = 'Dribbling';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.start').innerText).toEqual(component.infoStart);
    }));

    it("Info: information at the end not defined", async(() => {
        expect(fixture.nativeElement.querySelector('span.end').innerText).toEqual('0');
    }));

    it("Info: information at the end defined", async(() => {
        component.infoEnd = 'value';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.end').innerText).toEqual(component.infoEnd);
    }));

    it("Info: information at the end not defined, but progrees has value", async(() => {
        component.progress = 54;
        component.infoEnd = null;
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.end').innerText).toEqual(component.progress.toString());
    }));

    it("Info: information at the end defined, but clear end is true", async(() => {
        component.infoEnd = 'value';
        component.clearEnd = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.end')).toBeNull();
    }));

    it("Progress bar: default styles", async(() => {
        const barEl = el.query(By.css('div.progress-bar'));
        expect(barEl.styles.width).toEqual(component.progressValue);
        expect(component.progress).toEqual(CommonConstants.MIN_VALUE);
        expect(barEl.styles['background-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_LOW);
    }));

    it("Progress bar: first degree of default color function", async(() => {
        component.progress = 13;
        fixture.detectChanges();

        const barEl = el.query(By.css('div.progress-bar'));
        expect(barEl.styles.width).toEqual(component.progressValue);
        expect(barEl.styles['background-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.LOW);
    }));

    it("Progress bar: second degree of default color function", async(() => {
        component.progress = 25;
        fixture.detectChanges();

        expect(el.query(By.css('div.progress-bar')).styles['background-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_LOW);
    }));

    it("Progress bar: third degree of default color function", async(() => {
        component.progress = 37;
        fixture.detectChanges();

        expect(el.query(By.css('div.progress-bar')).styles['background-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_MEDIUM);
    }));

    it("Progress bar: fouth degree of default color function", async(() => {
        component.progress = 49;
        fixture.detectChanges();

        expect(el.query(By.css('div.progress-bar')).styles['background-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MEDIUM);
    }));

    it("Progress bar: fifth degree of default color function", async(() => {
        component.progress = 61;
        fixture.detectChanges();

        expect(el.query(By.css('div.progress-bar')).styles['background-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_MEDIUM);
    }));

    it("Progress bar: sixth degree of default color function", async(() => {
        component.progress = 73;
        fixture.detectChanges();

        expect(el.query(By.css('div.progress-bar')).styles['background-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_HIGH);
    }));

    it("Progress bar: seventh degree of default color function", async(() => {
        component.progress = 85;
        fixture.detectChanges();

        expect(el.query(By.css('div.progress-bar')).styles['background-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.HIGH);
    }));

    it("Progress bar: eighth degree of default color function", async(() => {
        component.progress = 100;
        fixture.detectChanges();

        expect(el.query(By.css('div.progress-bar')).styles['background-color']).toEqual(CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_HIGH);
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

        expect(el.query(By.css('div.progress-bar')).styles['background-color']).toEqual('red');

        component.progress = 50;
        fixture.detectChanges();

        expect(el.query(By.css('div.progress-bar')).styles['background-color']).toEqual('yellow');

        component.progress = 80;
        fixture.detectChanges();

        expect(el.query(By.css('div.progress-bar')).styles['background-color']).toEqual('green');
    }));

    it("Total: equal to zero", async(() => {
        component.total = 0;
        component.progress = 10;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.total).toEqual(component.progress);
        expect(component.progressValue).toEqual(CommonConstants.FULL_PERCENTAGE + '%');
    }));

    it("Total: greater than progress", async(() => {
        component.total = 20;
        component.progress = 30;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.total).toEqual(CommonConstants.FULL_PERCENTAGE);
        expect(component.progress).toEqual(CommonConstants.FULL_PERCENTAGE);
        expect(component.progressValue).toEqual(CommonConstants.FULL_PERCENTAGE + '%');
    }));
});

