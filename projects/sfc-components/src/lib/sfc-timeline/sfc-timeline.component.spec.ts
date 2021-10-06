import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcTimeLineComponent } from './sfc-timeline.component';
import { SfcComponentsModule } from '../sfc-components.module';
import { By } from '@angular/platform-browser';
import { TimeLinePosition } from '../common/constants/common-constants';

describe('Component: SfcTimeLineComponent', () => {

    let component: SfcTimeLineComponent;
    let fixture: ComponentFixture<SfcTimeLineComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcTimeLineComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcTimeLineComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcTimeLineComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.timeline-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.timeline-wrapper')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.timeline-inner-wrapper')).toBeDefined();
        expect(fixture.nativeElement.querySelector('ul.timeline')).toBeDefined();
    }));

    it("Items: count by default", async(() => {
        expect(el.queryAll(By.css('sfc-timeline-item')).length).toEqual(0);
    }));

    it("Items: count by defined config", async(() => {
        component.config = { items: [{ dateTimeLabel: '', title: '', position: TimeLinePosition.Left }] };
        fixture.detectChanges();

        expect(el.queryAll(By.css('sfc-timeline-item')).length).toEqual(component.config.items.length);
    }));

    it("Items: item value", async(() => {
        component.config = {
            items: [
                { dateTimeLabel: '', title: '', position: TimeLinePosition.Left },
                { dateTimeLabel: '', title: '', position: TimeLinePosition.Right }
            ]
        };
        fixture.detectChanges();

        const items = el.queryAll(By.css('sfc-timeline-item'));

        items.forEach((item, index) => {
            expect(item.componentInstance.item).toEqual(component.config.items[index]);
        });
    }));
});