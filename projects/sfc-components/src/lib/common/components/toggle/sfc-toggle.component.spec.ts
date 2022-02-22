import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { CommonConstants } from '../../constants/common-constants';
import { SfcToggleComponent } from './sfc-toggle.component';

describe('Component: SfcToggleComponent', () => {
  let component: SfcToggleComponent;
  let fixture: ComponentFixture<SfcToggleComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(SfcToggleComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
      });
  }));

  describe('General', () => {
    it('Should create component', () => {
      expect(component).toBeTruthy();
    });

    it('Main elements', () => {
      expect(fixture.nativeElement.querySelector('label.switch')).toBeDefined();
      expect(fixture.nativeElement.querySelector('span.switch-container')).toBeDefined();
      expect(fixture.nativeElement.querySelector('span.switch-container strong')).toBeDefined();
      expect(fixture.nativeElement.querySelectorAll('span.switch-container div.icon').length).toEqual(2);
    });

    it('Default value', () => {
      expect(component.value).toBeFalsy();
    });

    it('Default config value', () => {
      expect(component.config).toEqual({ checkedItem: CommonConstants.TOGGLE_DEFAULTS.CHECKED_ITEM, uncheckedItem: CommonConstants.TOGGLE_DEFAULTS.UNCHECKED_ITEM });
    });
  });

  describe('Icons', () => {
    it('Should be presented checked and unchecked', () => {
      expect(fixture.nativeElement.querySelector('span.switch-container div.icon.checked')).toBeDefined();
      expect(fixture.nativeElement.querySelector('span.switch-container div.icon.unchecked')).toBeDefined();
    });

    it('Should not exists by default', () => {
      expect(fixture.nativeElement.querySelectorAll('span.switch-container div.icon i').length).toEqual(0);
    });

    it('Should exists if values provided in config', () => {
      component.config.checkedItem.icon = 'fa-checked';
      component.config.uncheckedItem.icon = 'fa-unchecked';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('span.switch-container div.icon i').length).toEqual(2);
    });

    it('Should have relevant icon classes', () => {
      component.config.checkedItem.icon = 'fa-checked';
      component.config.uncheckedItem.icon = 'fa-unchecked';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.switch-container div.icon.checked i').className).toEqual(component.config.checkedItem.icon);
      expect(fixture.nativeElement.querySelector('span.switch-container div.icon.unchecked i').className).toEqual(component.config.uncheckedItem.icon);
    });
  });

  describe('Label', () => {
    it('Should exist by default', () => {
      expect(fixture.nativeElement.querySelector('span.switch-container strong')).toBeDefined();
    });

    it('Defaul value', () => {
      expect(fixture.nativeElement.querySelector('span.switch-container strong').innerText).toEqual(CommonConstants.TOGGLE_DEFAULTS.UNCHECKED_ITEM.label);
    });

    it('Checked value', () => {
      component.value = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.switch-container strong').innerText).toEqual(CommonConstants.TOGGLE_DEFAULTS.CHECKED_ITEM.label);
    });
    
    it('Label text should change depend on value', () => {
      expect(fixture.nativeElement.querySelector('span.switch-container strong').innerText).toEqual(CommonConstants.TOGGLE_DEFAULTS.UNCHECKED_ITEM.label);

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.switch-container strong').innerText).toEqual(CommonConstants.TOGGLE_DEFAULTS.CHECKED_ITEM.label);
    });

    it('Custom label text should change depend on value', () => {
      component.config.uncheckedItem.label = 'unchecked-label';
      component.config.checkedItem.label = 'checked-label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.switch-container strong').innerText).toEqual('unchecked-label');

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.switch-container strong').innerText).toEqual('checked-label');
    });
  });

  describe('Toggle(click)', () => {
    it('Value changing after toggling', () => {
      expect(component.value).toBeFalsy();

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.value).toBeTruthy();
    });

    it('Emmitings should be occurred', () => {
      spyOn(component.onToggle, 'emit');

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.onToggle.emit).toHaveBeenCalledWith(true);

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.onToggle.emit).toHaveBeenCalledWith(false);

      expect(component.onToggle.emit).toHaveBeenCalledTimes(2);
    });
  });
});