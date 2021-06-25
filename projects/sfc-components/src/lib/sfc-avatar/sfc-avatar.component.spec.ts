import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcAvatarComponent } from './sfc-avatar.component';
import { SfcComponentsModule } from '../sfc-components.module';
import { CommonConstants, ComponentSize } from '../common/constants/common-constants';
import { By } from '@angular/platform-browser';

describe('Component: SfcAvatarComponent', () => {

    let component: SfcAvatarComponent;
    let fixture: ComponentFixture<SfcAvatarComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcAvatarComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcAvatarComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("SfcAvatarComponent: main elements", async(() => {
        expect(fixture.nativeElement.querySelector('div.avatar-img-container-outer')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.avatar-info')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.avatar-img')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.avatar-img > svg')).toBeDefined();
        expect(fixture.nativeElement.querySelectorAll('div.avatar-img  circle.progress').length).toEqual(2);
        expect(fixture.nativeElement.querySelector('div.avatar-img circle.avatar-img')).toBeDefined();
        expect(fixture.nativeElement.querySelector('span.avatar-badge-raiting')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.avatar-info > div.avatar-fullname')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.avatar-info > div.avatar-position')).toBeDefined();
    }));

    it("Avatar image: hover effect", async(() => {
        const circlesEls = fixture.nativeElement.querySelectorAll('div.avatar-img  circle.progress');

        circlesEls.forEach(circleEl => {
            expect(circleEl.attributes['stroke-width'].nodeValue).toEqual(CommonConstants.AVATAR_DEFAULTS.STROKE.toString());
        });

        const avaterImgEl = el.query(By.css('div.avatar-img-container'));
        avaterImgEl.triggerEventHandler('mouseenter', { target: avaterImgEl.nativeElement });
        fixture.detectChanges();

        circlesEls.forEach(circleEl => {
            expect(circleEl.attributes['stroke-width'].nodeValue).toEqual((CommonConstants.AVATAR_DEFAULTS.STROKE * 1.5).toString());
        });

        avaterImgEl.triggerEventHandler('mouseleave', { target: avaterImgEl.nativeElement });
        fixture.detectChanges();

        circlesEls.forEach(circleEl => {
            expect(circleEl.attributes['stroke-width'].nodeValue).toEqual(CommonConstants.AVATAR_DEFAULTS.STROKE.toString());
        });
    }));

    it("SVG: size attributes", async(() => {
        const svgEl = el.query(By.css('div.avatar-img > svg'));
        expect(svgEl.attributes['width']).toEqual((component.width).toString());
        expect(svgEl.attributes['height']).toEqual((component.height).toString());
    }));

    it("SVG image pattern: attributes", async(() => {
        const patternEl = el.query(By.css('div.avatar-img > svg > defs > pattern')),
            patternImgEl = el.query(By.css('div.avatar-img > svg > defs > pattern > image'));

        expect(patternEl.attributes['width']).toEqual((component.width).toString());
        expect(patternEl.attributes['height']).toEqual((component.height).toString());
        expect(patternEl.attributes['patternUnits']).toEqual('userSpaceOnUse');
        expect(patternEl.properties.id).toBeDefined();

        expect(patternImgEl.attributes['width']).toEqual((component.width).toString());
        expect(patternImgEl.attributes['height']).toEqual((component.height).toString());
        expect(patternImgEl.attributes['preserveAspectRatio']).toEqual('xMidYMid slice');
        expect(patternImgEl.attributes['xlink:href']).toEqual(CommonConstants.AVATAR_DEFAULTS.AVATAR_IMAGE);
    }));

    it("SVG circle: attributes", async(() => {
        const circleEl = el.queryAll(By.css('div.avatar-img  circle.progress'))[0];

        expect(circleEl.attributes['stroke']).toEqual(CommonConstants.AVATAR_DEFAULTS.AVATAR_PROGRESS_BAR_COLORS.DEFAULT);
        expect(circleEl.attributes['stroke-width']).toEqual(component.stroke.toString());
        expect(circleEl.attributes['fill']).toEqual('transparent');
        expect(circleEl.attributes['r']).toEqual(component.normalizedRadius.toString());
        expect(circleEl.attributes['cx']).toEqual(component.radius.toString());
        expect(circleEl.attributes['cy']).toEqual(component.radius.toString());
    }));

    it("SVG filled circle: attributes", async(() => {
        const circleEl = el.queryAll(By.css('div.avatar-img  circle.progress'))[1];
        
        expect(circleEl.attributes['stroke-dasharray']).toEqual(component.circumference + ' ' + component.circumference);
        expect(circleEl.attributes['stroke']).toEqual(CommonConstants.AVATAR_DEFAULTS.AVATAR_PROGRESS_BAR_COLORS.FILLED);
        expect(circleEl.attributes['stroke-width']).toEqual(component.stroke.toString());
        expect(circleEl.attributes['fill']).toEqual('transparent');
        expect(circleEl.attributes['r']).toEqual(component.normalizedRadius.toString());
        expect(circleEl.attributes['cx']).toEqual(component.radius.toString());
        expect(circleEl.attributes['cy']).toEqual(component.radius.toString());
        expect(circleEl.styles['stroke-dashoffset'].toString()).toEqual(component.strokeDashoffset.toString());
    }));

    it("Avatar info: fullname default state", async(() => {
        expect(fixture.nativeElement.querySelector('div.avatar-info > div.avatar-fullname > span').innerText).toEqual('');
    }));

    it("Avatar info: only first name ", async(() => {
        component.avatarInfo = {firstName: 'FirstName', lastName: '', position: '', rating: 0, avatarSrc: ''};
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.avatar-info > div.avatar-fullname > span').innerText).toEqual(component.avatarInfo.firstName);
    }));

    it("Avatar info: only last name", async(() => {
        component.avatarInfo = {firstName: '', lastName: 'LastName', position: '', rating: 0, avatarSrc: ''};
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.avatar-info > div.avatar-fullname > span').innerText).toEqual(component.avatarInfo.lastName);
    }));

    it("Avatar info: with full name", async(() => {
        component.avatarInfo = {firstName: 'FirstName', lastName: 'LastName', position: '', rating: 0, avatarSrc: ''};
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.avatar-info > div.avatar-fullname > span').innerText).toEqual(component.avatarInfo.firstName + ' ' + component.avatarInfo.lastName);
    }));

    it("Avatar info: position default state", async(() => {
        expect(fixture.nativeElement.querySelector('div.avatar-info > div.avatar-position > span').innerText).toEqual('');
    }));

    it("Avatar info: with position", async(() => {
        component.avatarInfo = {firstName: '', lastName: '', position: 'Goalkeeper', rating: 0, avatarSrc: ''};
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.avatar-info > div.avatar-position > span').innerText).toEqual(component.avatarInfo.position);
    }));

    it("Badges: rating", async(() => {
        const badgesEls = el.queryAll(By.css('sfc-avatar-badge'));

        component.avatarInfo = {firstName: 'FirstName', lastName: 'LastName', position: '', rating: 100, avatarSrc: ''};
        fixture.detectChanges();

        expect(badgesEls.length).toEqual(1);
        expect(badgesEls[0].query(By.css('span.avatar-badge')).nativeElement.innerText).toEqual(component.avatarInfo.rating.toString());
        expect(badgesEls[0].componentInstance.radius).toEqual(component.radius);
        expect(badgesEls[0].componentInstance.icon).not.toBeDefined();
        expect(badgesEls[0].componentInstance.config).toEqual(component.ratingBadgeConfig);
    }));

    it("Badges: injured", async(() => {
        const badgesElsBefore = el.queryAll(By.css('sfc-avatar-badge'));
        expect(badgesElsBefore.length).toEqual(1);

        component.avatarInfo = {firstName: '', lastName: '', position: '', rating: 0, avatarSrc: '', isInjured: true};
        fixture.detectChanges();

        const badgesElsAfter = el.queryAll(By.css('sfc-avatar-badge'));        
        
        expect(badgesElsAfter.length).toEqual(2);
        expect(badgesElsAfter[1].componentInstance.radius).toEqual(component.radius);
        expect(badgesElsAfter[1].componentInstance.icon).toEqual('fa fa-plus');
        expect(badgesElsAfter[1].componentInstance.config).toEqual(component.injuredBadgeConfig);
    }));

    it("Badges: captain", async(() => {
        const badgesElsBefore = el.queryAll(By.css('sfc-avatar-badge'));
        expect(badgesElsBefore.length).toEqual(1);

        component.avatarInfo = {firstName: '', lastName: '', position: '', rating: 0, avatarSrc: '', isCaptain: true};
        fixture.detectChanges();

        const badgesElsAfter = el.queryAll(By.css('sfc-avatar-badge'));        
        
        expect(badgesElsAfter.length).toEqual(2);
        expect(badgesElsAfter[1].componentInstance.radius).toEqual(component.radius);
        expect(badgesElsAfter[1].componentInstance.icon).toEqual('fa fa-copyright');
        expect(badgesElsAfter[1].componentInstance.config).toEqual(component.captainBadgeConfig);
    }));

    it("Stars: attributes", async(() => {
        const starsElBefore = el.query(By.css('sfc-stars'));
        
        expect(starsElBefore).toBeNull();

        component.showStars = true;
        fixture.detectChanges();

        const starsElAfter = el.query(By.css('sfc-stars'));

        expect(starsElAfter).toBeDefined();
        expect(starsElAfter.attributes['size']).toEqual(ComponentSize.Small);
        expect(starsElAfter.attributes['ng-reflect-count']).toEqual(CommonConstants.DEFAULT_STARS_COUNT.toString());
        expect(starsElAfter.attributes['ng-reflect-value']).toEqual(component.starsValue.toString());
    }));
});