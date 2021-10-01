import { TestBed, ComponentFixture, async, fakeAsync, tick, flush, discardPeriodicTasks } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcNotificationComponent } from './sfc-notification.component';
import { SfcComponentsModule } from '../sfc-components.module';
import { CommonConstants, NotificationComponentType } from '../common/constants/common-constants';

describe('Component: SfcNotificationComponent', () => {

    let component: SfcNotificationComponent;
    let fixture: ComponentFixture<SfcNotificationComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcNotificationComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcNotificationComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcNotificationComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.notification-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.notification-box')).toBeDefined();
    }));

    it("Types: diffent values", async(() => {
        expect(fixture.nativeElement.querySelector('div.notification-container.info')).toBeDefined();

        component.type = NotificationComponentType.Success;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.notification-container.success')).toBeDefined();

        component.type = NotificationComponentType.Failed;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.notification-container.failed')).toBeDefined();
    }));

    it("Close icon: default", async(() => {
        expect(fixture.nativeElement.querySelector('div.close-container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.close-container svg.fas.fa-times')).toBeDefined();
    }));

    it("Close icon: not exist", async(() => {
        component.showClose = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.close-container')).toBeNull();
    }));

    xit("Close icon: on click event", async(() => {
        spyOn(component.onClose, 'emit');

        expect(fixture.nativeElement.querySelector('div.notification-container')).toBeDefined();

        const closeEl = el.query(By.css('div.close-container'));
        closeEl.triggerEventHandler('click', { target: closeEl.nativeElement });
        fixture.detectChanges();

        setTimeout(()=>{
            expect(fixture.nativeElement.querySelector('div.notification-container')).toBeNull();            
        }, 1000); 
        
        expect(component.onClose.emit).toHaveBeenCalledTimes(1);
    }));

    xit("Auto close: is ON", fakeAsync(() => {
        expect(fixture.nativeElement.querySelector('div.notification-container')).toBeDefined();

        component.autoClose = true;
        component.ngOnInit();
        fixture.detectChanges();

        tick(CommonConstants.NOTIFICATION_DESTROY_INTERVAL_MS);
        fixture.detectChanges();
        

        setTimeout(()=>{
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('div.notification-container')).toBeNull();            
        }, 1000); 

        flush();
        discardPeriodicTasks();
    }));

    it("Notification content: by default", async(() => {
        expect(fixture.nativeElement.querySelector('sfc-notification-content')).toBeDefined();
    }));

    it("Notification content: attributes", async(() => {
        component.title = 'test title';
        component.subTitle = 'test sub title';
        component.buttonText = 'test button';
        component.icon = 'fa fa-test';
        component.imgSrc = '.test.png';
        component.customSize = {width: 1, height: 2};
        component.showButton = true;
        fixture.detectChanges();

        const contentEl = el.query(By.css('sfc-notification-content'));

        expect(contentEl).toBeDefined();
        expect(contentEl.attributes['ng-reflect-type']).toEqual(NotificationComponentType.Info);
        expect(contentEl.attributes['ng-reflect-title']).toEqual(component.title);
        expect(contentEl.attributes['ng-reflect-sub-title']).toEqual(component.subTitle);
        expect(contentEl.attributes['ng-reflect-button-text']).toEqual(component.buttonText);
        expect(contentEl.attributes['ng-reflect-icon']).toEqual(component.icon);
        expect(contentEl.attributes['ng-reflect-img-src']).toEqual(component.imgSrc);
        expect(contentEl.attributes['ng-reflect-show-button']).toEqual('true');
        expect(contentEl.componentInstance.customSize).toEqual(component.customSize);
    }));

    it("Notification content: button click event", async(() => {
        spyOn(component.onButtonClick, 'emit');

        const contentBtnEl = el.query(By.css('.action-container > sfc-button > a'));
        contentBtnEl.triggerEventHandler('click', { target: contentBtnEl.nativeElement });
        fixture.detectChanges();

        expect(component.onButtonClick.emit).toHaveBeenCalledTimes(1);
    }));
});

@Component({
    template: `<sfc-notification>

                <h1 class="custom-content">Test content</h1>

               </sfc-notification>`
})
class TestSfcNotificationComponent {}

describe('Component: SfcNotificationComponent with ng-content', () => {

    let component: TestSfcNotificationComponent;
    let fixture: ComponentFixture<TestSfcNotificationComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [TestSfcNotificationComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TestSfcNotificationComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcNotificationComponent: with content", async(() => {
        expect(fixture.nativeElement.querySelector('sfc-notification-content')).toBeNull();
        expect(fixture.nativeElement.querySelector('h1.custom-content')).toBeDefined();
        expect(fixture.nativeElement.querySelector('h1.custom-content').innerText).toEqual('Test content');
    }));
});
