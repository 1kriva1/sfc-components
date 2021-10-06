import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../sfc-components.module';
import { SfcTimeLineItemComponent } from './sfc-timeline-item.component';
import { TimeLinePosition } from '../../common/constants/common-constants';

describe('Component: SfcTimeLineItemComponent', () => {

    let component: SfcTimeLineItemComponent;
    let fixture: ComponentFixture<SfcTimeLineItemComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcTimeLineItemComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcTimeLineItemComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcTimeLineItemComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('li.timeline-item')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.timeline-info')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.timeline-marker')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.timeline-content')).toBeDefined();
    }));

    it("Period: is not period item (by default)", async(() => {
        expect(fixture.nativeElement.querySelector('li.timeline-item.period')).toBeNull();
    }));

    it("Period: is period item", async(() => {
        component.item = { dateTimeLabel: '', title: '', position: TimeLinePosition.Left, isPeriod: true };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('li.timeline-item.period')).toBeDefined();
    }));

    it("Position: left (by default)", async(() => {
        expect(el.nativeElement.className).toContain(TimeLinePosition.Left);
    }));

    it("Position: right (defined)", async(() => {
        component.item = { dateTimeLabel: '', title: '', position: TimeLinePosition.Right };
        fixture.detectChanges();

        expect(el.nativeElement.className).toContain(TimeLinePosition.Right);
    }));

    it("Date time label: default/custom values", async(() => {
        expect(fixture.nativeElement.querySelector('div.timeline-info > span').innerText).toEqual('');

        component.item = { dateTimeLabel: "54'", title: '', position: TimeLinePosition.Right };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.timeline-info > span').innerText).toEqual(component.item.dateTimeLabel);
    }));

    it("Icon: without icon", async(() => {
        const iconEl = fixture.nativeElement.querySelector('div.timeline-content > i');
        expect(iconEl).toBeNull();
    }));

    it("Icon: with icon", async(() => {
        component.item = { dateTimeLabel: '', title: '', position: TimeLinePosition.Left, icon: 'fa fa-test' };
        fixture.detectChanges();

        const iconEl = fixture.nativeElement.querySelector('div.timeline-content > i');

        expect(iconEl.className).toContain('fa');
        expect(iconEl.className).toContain('fa-test');
    }));

    it("Image: without image src", async(() => {
        const imageEl = fixture.nativeElement.querySelector('div.timeline-content > img');
        expect(imageEl).toBeNull();
    }));

    it("Image: with image src", async(() => {
        component.item = { dateTimeLabel: '', title: '', position: TimeLinePosition.Left, imgSrc: '/test.png' };
        fixture.detectChanges();

        const imageEl = fixture.nativeElement.querySelector('div.timeline-content > img');

        expect(imageEl).toBeDefined();
        expect(imageEl.src).toContain(component.item.imgSrc);
    }));

    it("Image: with icon", async(() => {
        component.item = { dateTimeLabel: '', title: '', position: TimeLinePosition.Left, imgSrc: '/test.png', icon: 'fa fa-test' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.timeline-content > img')).toBeNull();
    }));

    it("Title: default/custom values", async(() => {
        expect(fixture.nativeElement.querySelector('div.timeline-content > span.timeline-title').innerText).toEqual('');

        component.item = { dateTimeLabel: '', title: 'test title', position: TimeLinePosition.Left };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.timeline-content > span.timeline-title').innerText).toEqual(component.item.title);
    }));

    it("Description: default/custom values", async(() => {
        expect(fixture.nativeElement.querySelector('div.timeline-content > p').innerText).toEqual('');

        component.item = { dateTimeLabel: '', title: '', description: 'test description', position: TimeLinePosition.Left };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.timeline-content > p').innerText).toEqual(component.item.description);
    }));
});