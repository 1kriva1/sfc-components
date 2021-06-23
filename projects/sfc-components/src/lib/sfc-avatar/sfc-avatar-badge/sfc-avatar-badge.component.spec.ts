import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SfcAvatarBadgeComponent } from './sfc-avatar-badge.component';
import { SfcComponentsModule } from '../../sfc-components.module';

describe('Component: SfcAvatarComponent', () => {

    let component: SfcAvatarBadgeComponent;
    let fixture: ComponentFixture<SfcAvatarBadgeComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SfcComponentsModule],
            declarations: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SfcAvatarBadgeComponent);
            el = fixture.debugElement;
            component = el.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("SfcAvatarBadgeComponent: Should create component", async(() => {
        expect(component).toBeTruthy();
        expect(fixture.nativeElement.querySelector('span.avatar-badge')).toBeDefined();
    }));

    it("Icon: not created if icon value not defined", () => {
        expect(fixture.nativeElement.querySelector('i.icon')).toBeNull();
    });

    it("Icon: should create icon element if icon value defined", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('i.icon')).toBeDefined();
    });

    it("Icon: should add class to icon element", () => {
        component.icon = 'fa fa-user';
        fixture.detectChanges();

        const icon = fixture.nativeElement.querySelector('i.icon');

        expect(icon.className).toContain('icon');
        expect(icon.className).toContain('fa');
        expect(icon.className).toContain('fa-user');
    });

    it("Styles: default", () => {
        const badgeEl = el.query(By.css('span.avatar-badge'));

        expect(badgeEl.styles.top).toBeNull();
        expect(badgeEl.styles.bottom).toBeNull();
        expect(badgeEl.styles.left).toBeNull();
        expect(badgeEl.styles.right).toBeNull();
        expect(badgeEl.styles.color).toBeNull();
        expect(badgeEl.styles.backgroundColor).toBeNull();
        expect(badgeEl.styles.height).toBeNull();
        expect(badgeEl.styles.width).toBeNull();
        expect(badgeEl.styles.fontSize).toEqual('0px');
    });

    it("Styles: with defined value", () => {
        component.radius = 80;
        component.config = { width: '10px', height: '10px', top: '20%', left: '24%', background: 'red', color: 'grey' }
        fixture.detectChanges();

        const badgeEl = el.query(By.css('span.avatar-badge'));

        expect(badgeEl.styles.top).toEqual(component.config.top);
        expect(badgeEl.styles.bottom).toBeNull();
        expect(badgeEl.styles.left).toEqual(component.config.left);
        expect(badgeEl.styles.right).toBeNull();
        expect(badgeEl.styles.color).toEqual(component.config.color);
        expect(badgeEl.styles.backgroundColor).toEqual(component.config.background);
        expect(badgeEl.styles.height).toEqual(component.config.height);
        expect(badgeEl.styles.width).toEqual(component.config.width);
        expect(badgeEl.styles.fontSize).toEqual('16px');
    });
});