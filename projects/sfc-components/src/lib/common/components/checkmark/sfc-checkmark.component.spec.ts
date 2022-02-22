import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { SfcCheckmarkComponent } from './sfc-checkmark.component';

describe('Component: SfcCheckmarkComponent', () => {
  let component: SfcCheckmarkComponent;
  let fixture: ComponentFixture<SfcCheckmarkComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule],
      declarations: [],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SfcCheckmarkComponent);
      el = fixture.debugElement;
      component = el.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('SfcCheckmarkComponent: Should create component', () => {
    expect(component).toBeTruthy();
  });

  it("SfcCheckmarkComponent: main elements", async(() => {
    expect(fixture.nativeElement.querySelector('div.checkmark-container')).toBeDefined();
    expect(fixture.nativeElement.querySelector('span.check')).toBeDefined();
    expect(fixture.nativeElement.querySelector('span.check > svg')).toBeDefined();
  }));

  it('Checked: default state', () => {
    expect(fixture.nativeElement.querySelector('div.checkmark-container.checked')).toBeNull();
  });

  it('Checked: checked on init', () => {
    component.checked = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div.checkmark-container.checked')).toBeDefined();
  });

  it('Checked: toggle value', () => {
    const checkMarkContainerEl = fixture.nativeElement.querySelector('div.checkmark-container');
    checkMarkContainerEl.dispatchEvent(new MouseEvent('click', {}));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div.checkmark-container.checked')).toBeDefined();

    checkMarkContainerEl.dispatchEvent(new MouseEvent('click', {}));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div.checkmark-container.checked')).toBeNull();
  });

  it('Icon: default value', () => {
    const iconEl = fixture.nativeElement.querySelector('span.check > i');

    expect(iconEl.className).toContain('icon');
    expect(iconEl.className).toContain('fa');
    expect(iconEl.className).toContain('fa-check');
  });

  it('Icon: defined value', () => {
    component.icon = 'fa fa-test';
    fixture.detectChanges();

    const iconEl = fixture.nativeElement.querySelector('span.check > i');

    expect(iconEl.className).toContain('icon');
    expect(iconEl.className).toContain('fa');
    expect(iconEl.className).toContain('fa-test');
  });
});
