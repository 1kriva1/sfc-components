import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { CommonConstants, SortingDirection } from '../../constants/common-constants';
import { SfcSortingComponent } from './sfc-sorting.component';

describe('Component: SfcSortingComponent', () => {
  let component: SfcSortingComponent;
  let fixture: ComponentFixture<SfcSortingComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SfcSortingComponent);
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
      expect(fixture.nativeElement.querySelector('div.sorting-container')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.sorting-content')).toBeDefined();
    });
  });

  describe('Icons', () => {
    it('Enabled by default', () => {
      expect(fixture.nativeElement.querySelector('div.sorting-icons')).toBeNull();
    });

    it('Enabled is true', () => {
      component.config = { enabled: true, active: false };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.sorting-icons')).toBeDefined();
    });

    it('Icons when direction defined', () => {
      component.config = { enabled: true, active: false, direction: SortingDirection.Descending };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.sorting-icons i').className).not.toEqual(CommonConstants.SORTING_DEFAULT_ICONS.ASC_ICON);
      expect(fixture.nativeElement.querySelector('div.sorting-icons i').className).toEqual(CommonConstants.SORTING_DEFAULT_ICONS.DESC_ICON);
    });

    it('Defined custom values for icons', () => {
      component.config = {
        enabled: true, 
        active: false,
        direction: SortingDirection.Ascending,
        icons: [
          { direction: SortingDirection.Ascending, icon: 'fa fa-asc-test' },
          { direction: SortingDirection.Descending, icon: 'fa fa-desc-test' }
        ]
      };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.sorting-icons i').className).not.toEqual(CommonConstants.SORTING_DEFAULT_ICONS.ASC_ICON);
      expect(fixture.nativeElement.querySelector('div.sorting-icons i').className).not.toEqual(CommonConstants.SORTING_DEFAULT_ICONS.DESC_ICON);
      expect(fixture.nativeElement.querySelector('div.sorting-icons i').className).toEqual('fa fa-asc-test');

      component.config.direction = SortingDirection.Descending;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.sorting-icons i').className).toEqual('fa fa-desc-test');
    });

    it('Icons when on click event occurred, but sorting not enabled', () => {
      spyOn(component.sortingService, 'sort');

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.sortingService.sort).not.toHaveBeenCalled();
    });

    it('Icons when on click event occurred and sorting enabled', () => {
      component.config = { enabled: true, active: true, direction: SortingDirection.Ascending };
      fixture.detectChanges();

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.sorting-icons i').className).not.toEqual(CommonConstants.SORTING_DEFAULT_ICONS.ASC_ICON);
      expect(fixture.nativeElement.querySelector('div.sorting-icons i').className).toEqual(CommonConstants.SORTING_DEFAULT_ICONS.DESC_ICON);
    });

    it('Icons when on click event occurred and sorting enabled, but not active', () => {
      component.config = { enabled: true, active: false, direction: SortingDirection.Ascending };
      fixture.detectChanges();

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.sorting-icons i').className).not.toEqual(CommonConstants.SORTING_DEFAULT_ICONS.DESC_ICON);
      expect(fixture.nativeElement.querySelector('div.sorting-icons i').className).toEqual(CommonConstants.SORTING_DEFAULT_ICONS.ASC_ICON);
    });
  });

  describe('Sorting service', () => {
    it('Service was not called because sorting was not enabled', () => {
      spyOn(component.sortingService, 'sort');

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.sortingService.sort).not.toHaveBeenCalled();
    });

    it('Service was called because sorting was enabled', () => {
      spyOn(component.sortingService, 'sort');

      component.config = { enabled: true, active: false };
      fixture.detectChanges();

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.sortingService.sort).toHaveBeenCalled();
    });

    it('Service was called with undefined sorting id', () => {
      spyOn(component.sortingService, 'sort');

      component.config = { enabled: true, active: true, direction: SortingDirection.Ascending };
      fixture.detectChanges();

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.sortingService.sort).toHaveBeenCalledWith({ sortingId: undefined, direction: SortingDirection.Descending });
    });

    it('Service was called when not active', () => {
      spyOn(component.sortingService, 'sort');

      component.config = { enabled: true, active: false, direction: SortingDirection.Ascending };
      fixture.detectChanges();

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.sortingService.sort).toHaveBeenCalledWith({ sortingId: undefined, direction: SortingDirection.Ascending });
    });

    it('Service was called with defined parameters', () => {
      spyOn(component.sortingService, 'sort');

      component.config = { enabled: true, active: true, direction: SortingDirection.Descending };
      component.id = 'testId';
      fixture.detectChanges();

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.sortingService.sort).toHaveBeenCalledWith({ sortingId: 'testId', direction: SortingDirection.Ascending });
    });

    it('Service was called several times', () => {
      spyOn(component.sortingService, 'sort');

      component.config = { enabled: true, active: true, direction: SortingDirection.Ascending };
      fixture.detectChanges();

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.sortingService.sort).toHaveBeenCalledWith({ sortingId: undefined, direction: SortingDirection.Descending });

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.sortingService.sort).toHaveBeenCalledWith({ sortingId: undefined, direction: SortingDirection.Ascending });
    });

    it('Service was called with another sorting id', () => {
      component.id = 'testId';
      component.config = { enabled: true, active: true, direction: SortingDirection.Ascending };
      fixture.detectChanges();

      expect(component.config.direction).toEqual(SortingDirection.Ascending);

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.config.direction).toEqual(SortingDirection.Descending);

      component.sortingService.sort({ sortingId: 'testIdNew', direction: SortingDirection.Descending });

      expect(component.config.direction).toEqual(SortingDirection.Ascending);
    });
  });
});

@Component({
  template: `<sfc-sorting>
              <h1 class="custom-content">Test content</h1>
             </sfc-sorting>`
})
class TestSfcSortingComponent { }

describe('SfcSortingComponent: Sorting content', () => {

  let fixture: ComponentFixture<TestSfcSortingComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule],
      declarations: [TestSfcSortingComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TestSfcSortingComponent);
      el = fixture.debugElement;
      fixture.detectChanges();
    });
  }));

  it('With content', async(() => {
    expect(fixture.nativeElement.querySelector('h1.custom-content')).toBeDefined();
    expect(fixture.nativeElement.querySelector('h1.custom-content').innerText).toEqual('Test content');
  }));
});