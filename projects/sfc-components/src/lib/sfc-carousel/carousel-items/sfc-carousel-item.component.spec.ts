import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../../sfc-components.module';
import { CarouselItemState, PositionType } from '../../common/constants/common-constants';
import { SfcCarouselItemComponent } from './sfc-carousel-item.component';

describe('Component: SfcCarouselItemComponent', () => {

    let component: SfcCarouselItemComponent;
    let fixture: ComponentFixture<SfcCarouselItemComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcCarouselItemComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcCarouselItemComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
    }));

    it("Container: should create container", async(() => {
        expect(fixture.nativeElement.querySelector('div.carousel-item')).toBeDefined();
    }));

    it("Class: type - horizontal", async(() => {
        expect(fixture.nativeElement.className).toContain(PositionType.Horizontal);
    }));

    it("Class: type - vertical", async(() => {
        component.type = PositionType.Vertical;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(PositionType.Vertical);
    }));

    it("Class: position - center", async(() => {
        component.index = 1;
        component.currentIndex = 1;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(CarouselItemState.Center);
    }));

    it("Class: position - show down", async(() => {
        component.state = { created: true }
        component.previousIndex = 3;
        component.currentIndex = 2;
        component.count = 3;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(CarouselItemState.ShowDown);
    }));

    it("Class: position - show up", async(() => {
        component.state = { created: true }
        component.previousIndex = 2;
        component.currentIndex = 3;
        component.count = 3;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(CarouselItemState.ShowUp);
    }));

    it("Class: position - hide down", async(() => {
        component.state = { removed: true }
        component.previousIndex = 3;
        component.currentIndex = 2;
        component.count = 3;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(CarouselItemState.HideDown);
    }));

    it("Class: position - hide up", async(() => {
        component.state = { removed: true }
        component.previousIndex = 2;
        component.currentIndex = 3;
        component.count = 3;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(CarouselItemState.HideUp);
    }));

    it("Class: position - up - difference equal 1", async(() => {
        component.state = { };
        component.currentIndex = 3;
        component.index = 2;
        component.count = 3;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(CarouselItemState.Up);
    }));

    it("Class: position - up", async(() => {
        component.state = { };
        component.currentIndex = 3;
        component.index = 6;
        component.count = 3;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(CarouselItemState.Up);
    }));

    it("Class: position - down - difference equal -1", async(() => {
        component.state = { };
        component.currentIndex = 2;
        component.index = 3;
        component.count = 3;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(CarouselItemState.Down);
    }));

    it("Class: position - down", async(() => {
        component.state = { };
        component.currentIndex = 4;
        component.index = 1;
        component.count = 3;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(CarouselItemState.Down);
    }));

    it("Class: position - hide", async(() => {
        component.state = { };
        component.currentIndex = 2;
        component.index = 4;
        component.count = 4;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(CarouselItemState.Hide);
    }));
});

