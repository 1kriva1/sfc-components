import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { CommonConstants, StyleClass } from '../../common/constants/common-constants';
import { ResizeService } from '../../common/services/resize.service';
import { SfcComponentsModule } from '../../sfc-components.module';
import { ColumnsToggleService } from '../services/columns-toggle/columns-toggle.service';
import { SfcColumnsToggleComponent } from './sfc-columns-toggle.component';

describe('Component: SfcColumnsToggleComponent', () => {
  let component: SfcColumnsToggleComponent;
  let fixture: ComponentFixture<SfcColumnsToggleComponent>;
  let el: DebugElement;
  let service: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule],
      providers: [
        ResizeService,
        { provide: ColumnsToggleService, useValue: { showColumns$: new Subject(), toggleColumns: () => { } } }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SfcColumnsToggleComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      service = TestBed.get(ColumnsToggleService);
      fixture.detectChanges();
    });
  }));

  describe('General', () => {
    it('Should create component', () => {
      expect(component).toBeTruthy();
    });

    it('Main elements', () => {
      expect(fixture.nativeElement.querySelector('div.columns-toggle-container')).toBeDefined();
      expect(fixture.nativeElement.querySelectorAll('div.columns-toggle-container span.icon').length).toEqual(2);
      expect(fixture.nativeElement.querySelector('div.columns-toggle-container span.label')).toBeDefined();
    });

    it('On toggle', () => {
      spyOn(component.columnsToggleService, 'toggleColumns');

      el.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.columnsToggleService.toggleColumns).toHaveBeenCalledTimes(1);
    });
  });

  describe('Icon', () => {
    it('Show icon class', () => {
      service.showColumns$.next(false);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('div.columns-toggle-container span.icon')[0].firstElementChild.className).toEqual(CommonConstants.TABLE_DEFAULTS.COLUMNS_TOGGLE.SHOW.ICON);
    });

    it('Hide icon class', () => {
      service.showColumns$.next(false);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('div.columns-toggle-container span.icon')[1].firstElementChild.className).toEqual(CommonConstants.TABLE_DEFAULTS.COLUMNS_TOGGLE.HIDE.ICON);
    });
    
    it('Should be show icon when value is false', () => {
      service.showColumns$.next(false);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('div.columns-toggle-container span.icon')[0].style.visibility).toEqual(StyleClass.Visible);
      expect(fixture.nativeElement.querySelectorAll('div.columns-toggle-container span.icon')[1].style.visibility).toEqual(StyleClass.Hidden);
    });

    it('Should be hide icon when value is true', () => {
      service.showColumns$.next(true);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('div.columns-toggle-container span.icon')[0].style.visibility).toEqual(StyleClass.Hidden);
      expect(fixture.nativeElement.querySelectorAll('div.columns-toggle-container span.icon')[1].style.visibility).toEqual(StyleClass.Visible);
    });
  });

  describe('Label', () => {
    it('Should be show label when value is false', () => {
      service.showColumns$.next(false);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.columns-toggle-container span.label').innerText).toEqual(CommonConstants.TABLE_DEFAULTS.COLUMNS_TOGGLE.SHOW.LABEL);
    });

    it('Should be hide label when value is true', () => {
      service.showColumns$.next(true);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.columns-toggle-container span.label').innerText).toEqual(CommonConstants.TABLE_DEFAULTS.COLUMNS_TOGGLE.HIDE.LABEL);
    });
  });
});