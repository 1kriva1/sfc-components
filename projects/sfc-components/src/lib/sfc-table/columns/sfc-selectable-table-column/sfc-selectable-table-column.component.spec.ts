import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SfcSelectableTableColumnComponent } from './sfc-selectable-table-column.component';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { TableSelectedService } from '../../services/table-selected/table-selected.service';
import { By } from '@angular/platform-browser';
import { CommonConstants } from '../../../common/constants/common-constants'

describe('Component: SfcSelectableTableColumnComponent', () => {
  let component: SfcSelectableTableColumnComponent;
  let fixture: ComponentFixture<SfcSelectableTableColumnComponent>;
  let el: DebugElement;
  let mockTableSelectedService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule],
      providers: [
        { provide: TableSelectedService, useValue: jasmine.createSpyObj('TableSelectedService', ['selectAllRows']) }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SfcSelectableTableColumnComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;     
      mockTableSelectedService = TestBed.get(TableSelectedService); 
      fixture.detectChanges();
    });
  }));

  describe('General', () => {
    it('Should create component', () => {
      expect(component).toBeTruthy();
    });

    it('Main elements', () => {
      expect(fixture.nativeElement.querySelector('div.column')).toBeDefined();
      expect(fixture.nativeElement.querySelector('sfc-checkmark')).toBeDefined();
      expect(fixture.nativeElement.querySelector('span.label')).toBeDefined();
    });
  });

  describe('Checkmark', () => {
    it('Should be not checked by default', () => {
      expect(el.query(By.css('sfc-checkmark')).attributes['ng-reflect-checked']).toEqual('false');
    });

    it('Should be checked if component selected value equal true', () => {
      component.selected = true;
      fixture.detectChanges();

      expect(el.query(By.css('sfc-checkmark')).attributes['ng-reflect-checked']).toEqual('true');
    });
  });

  describe('Label', () => {
    it('Should have constant value', () => {
      expect(fixture.nativeElement.querySelector('span.label').innerText).toEqual(CommonConstants.TABLE_DEFAULTS.DEFAULT_COLUMN_TEXT_SELECT_ALL);
    });
  });

  describe('On toggle selection', () => {
    it('Should call table selected service when click component', () => {
      toggleSelection();

      expect(mockTableSelectedService.selectAllRows).toHaveBeenCalledTimes(1);
    });

    it('Should pass TRUE value at first click (default state)', () => {
      toggleSelection();

      expect(mockTableSelectedService.selectAllRows).toHaveBeenCalledWith(true);
    });

    it('Should pass FALSE value at first click (selected is TRUE)', () => {
      component.selected = true;
      fixture.detectChanges();

      toggleSelection();

      expect(mockTableSelectedService.selectAllRows).toHaveBeenCalledWith(false);
    });

    it('Should pass inverted values on each click', () => {
      toggleSelection();

      expect(mockTableSelectedService.selectAllRows).toHaveBeenCalledWith(true);

      toggleSelection();

      expect(mockTableSelectedService.selectAllRows.calls.allArgs()).toEqual([[true], [false]]);

      expect(mockTableSelectedService.selectAllRows).toHaveBeenCalledTimes(2);
    });

    function toggleSelection(){
      fixture.nativeElement.querySelector('div.column').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();
    }
  });
});