import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { By } from '@angular/platform-browser';
import { ComponentSize, PositionType } from '../../../common/constants/common-constants';
import { SfcCarouselItemAvatarComponent } from './sfc-carousel-item-avatar.component';

describe('Component: SfcCarouselItemAvatarComponent', () => {

    let component: SfcCarouselItemAvatarComponent;
    let fixture: ComponentFixture<SfcCarouselItemAvatarComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcCarouselItemAvatarComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcCarouselItemAvatarComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Carousel item: attributes", async(() => {
        component.count = 3;
        component.currentIndex = 2;
        component.index = 1;
        component.previousIndex = 1;
        component.size = ComponentSize.Large;
        component.type = PositionType.Vertical;
        component.state = { created: true, removed: false, hidden: false };
        fixture.detectChanges();

        const carouselItem = el.query(By.css('sfc-carousel-item'));

        expect(carouselItem).toBeDefined();
        expect(carouselItem.attributes['ng-reflect-type']).toEqual(PositionType.Vertical);
        expect(carouselItem.attributes['ng-reflect-count']).toEqual(component.count.toString());
        expect(carouselItem.attributes['ng-reflect-current-index']).toEqual(component.currentIndex.toString());
        expect(carouselItem.attributes['ng-reflect-index']).toEqual(component.index.toString());
        expect(carouselItem.attributes['ng-reflect-previous-index']).toEqual(component.previousIndex.toString());
        expect(carouselItem.componentInstance.state).toEqual(component.state);
    }));

    it("Container: should create element", async(() => {
        expect(fixture.nativeElement.querySelector('div.content-container')).toBeDefined();
    }));

    it("Container: size class", async(() => {
        component.size = ComponentSize.Large;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.content-container.large')).toBeDefined();
    }));

    it("Avatar: attributes", async(() => {
        component.item = {
            avatarInfo: {
                rating: 71,
                firstName: 'Andrii',
                lastName: 'Kryvoruk',
                position: 'Goalkeeper',
                avatarSrc: '../assets/test.png',
                isInjured: false,
                isCaptain: false
            }, progress: 71, showStars: true, radius: 30
        };
        fixture.detectChanges();

        const avatarEl = el.query(By.css('sfc-avatar'));
        expect(avatarEl).toBeDefined();
        expect(avatarEl.attributes['ng-reflect-progress']).toEqual(component.item.progress.toString());
        expect(avatarEl.attributes['ng-reflect-show-stars']).toEqual('true');
        expect(avatarEl.attributes['ng-reflect-radius']).toEqual(component.item.radius.toString());
        expect(avatarEl.componentInstance.avatarInfo).toEqual(component.item.avatarInfo);
    }));
});

