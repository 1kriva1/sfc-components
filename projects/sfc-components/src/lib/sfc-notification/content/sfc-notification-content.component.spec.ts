import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../sfc-components.module';
import { SfcNotificationContentComponent } from './sfc-notification-content.component';
import { ButtonType, NotificationComponentType } from '../../common/constants/common-constants';
import { By } from '@angular/platform-browser';

describe('Component: SfcNotificationContentComponent', () => {

    let component: SfcNotificationContentComponent;
    let fixture: ComponentFixture<SfcNotificationContentComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcNotificationContentComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcNotificationContentComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcNotificationContentComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.content-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.illustration')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.message')).toBeDefined();
    }));

    it("Types: diffent values", async(() => {
        expect(fixture.nativeElement.querySelector('div.content-container.info')).toBeDefined();

        component.type = NotificationComponentType.Success;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.content-container.success')).toBeDefined();

        component.type = NotificationComponentType.Failed;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.content-container.failed')).toBeDefined();
    }));

    it("Size: custom value", async(() => {
        component.customSize = { height: 700, width: 1300 }
        fixture.detectChanges();

        const wrapperEl = fixture.nativeElement.querySelector('div.content-container');

        expect(wrapperEl.offsetWidth + 'px').toEqual(component.size.width);
        expect(wrapperEl.offsetHeight + 'px').toEqual(component.size.height);
    }));

    it("Icon: without icon", async(() => {
        const iconEl = fixture.nativeElement.querySelector('.icon > i');
        expect(iconEl).toBeNull();
    }));

    it("Icon: with icon", async(() => {
        component.icon = 'fa fa-test';
        fixture.detectChanges();

        const iconEl = fixture.nativeElement.querySelector('.icon > i');

        expect(iconEl.className).toContain('fa');
        expect(iconEl.className).toContain('fa-test');
    }));

    it("Image: without image src", async(() => {
        const imageEl = fixture.nativeElement.querySelector('.image > img');
        expect(imageEl).toBeNull();
    }));

    it("Image: with image src", async(() => {
        component.imgSrc = '/test.png';
        fixture.detectChanges();

        const imageEl = fixture.nativeElement.querySelector('.image > img');

        expect(imageEl).toBeDefined();
        expect(imageEl.src).toContain(component.imgSrc);
    }));

    it("Image: with icon", async(() => {
        component.icon = 'fa fa-test';
        component.imgSrc = '/test.png';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.image > img')).toBeNull();
    }));

    it("Title: value", async(() => {
        expect(fixture.nativeElement.querySelector('.message > h1').innerText).toEqual('');

        component.title = 'test_title';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.message > h1').innerText).toEqual(component.title.toUpperCase());
    }));

    it("Sub title: value", async(() => {
        expect(fixture.nativeElement.querySelector('.message > p').innerText).toEqual('');

        component.subTitle = 'test sub title';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.message > p').innerText).toEqual(component.subTitle);
    }));

    it("Button: exist/not exist", async(() => {
        expect(fixture.nativeElement.querySelector('.action-container > sfc-button')).toBeDefined();

        component.showButton = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.action-container > sfc-button')).toBeNull();
    }));

    it("Button: attributes", async(() => {
        const buttonEl = el.query(By.css('.action-container > sfc-button'));

        expect(buttonEl).toBeDefined();
        expect(buttonEl.attributes['ng-reflect-text']).toEqual('');
        expect(buttonEl.attributes['ng-reflect-types']).toEqual(`${ButtonType.Rounded},${ButtonType.Filled}`);

        component.buttonText = 'test button';
        fixture.detectChanges();

        expect(buttonEl.attributes['ng-reflect-text']).toEqual(component.buttonText);

        component.buttonText = null;
        component.type = NotificationComponentType.Success;
        fixture.detectChanges();

        expect(buttonEl.attributes['ng-reflect-text']).toEqual(component.type);
    }));

    it("Button: click event", async(() => {
        spyOn(component.onButtonClick, 'emit');

        const buttonEl = el.query(By.css('.action-container > sfc-button > a'));
        buttonEl.triggerEventHandler('click', { target: buttonEl.nativeElement });
        fixture.detectChanges();

        expect(component.onButtonClick.emit).toHaveBeenCalledTimes(1);
    }));
});

