import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SfcComponentsModule } from '../../../../sfc-components.module';
import { SfcDefaultTableCardComponent } from './sfc-default-table-card.component';
import { By } from '@angular/platform-browser';
import { TableColumnType } from '../../../../common/constants/common-constants';

describe('Component: SfcDefaultTableCardComponent', () => {
  let component: SfcDefaultTableCardComponent;
  let fixture: ComponentFixture<SfcDefaultTableCardComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SfcDefaultTableCardComponent);
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
      expect(fixture.nativeElement.querySelector('div.card-container')).toBeDefined();
    });

    it('Should not be even by default', () => {
      expect(fixture.nativeElement.querySelector('div.row-container.even')).toBeNull();
    });

    it('Should be even if index is even', () => {
      component.data.index = 1;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.row-container.even')).toBeDefined();
    });

    it('Should not be even if index is not even', () => {
      component.data.index = 0;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.row-container.even')).toBeNull();
    });

    it('Should not have pointer class by default', () => {
      expect(fixture.nativeElement.querySelector('div.row-container.pointer')).toBeNull();
    });

    it('Should have pointer class if selectOnClick is TRUE', () => {
      component.selectOnClick = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.row-container.pointer')).toBeDefined();
    });

    it('Should not have pointer class if selectOnClick is FALSE', () => {
      component.selectOnClick = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.row-container.pointer')).toBeNull();
    });

    it('On select should be called', () => {
      spyOn(component.onSelect, 'emit');
      component.selectOnClick = true;
      component.data.index = 0;
      fixture.detectChanges();

      selectRow();

      expect(component.onSelect.emit).toHaveBeenCalled();
    });

    it('On select should not be called', () => {
      spyOn(component.onSelect, 'emit');
      component.selectOnClick = false;
      component.data.index = 0;
      fixture.detectChanges();

      selectRow();

      expect(component.onSelect.emit).not.toHaveBeenCalled();
    });

    it('On select should be called for unselected card', () => {
      spyOn(component.onSelect, 'emit');
      component.selectOnClick = true;
      component.data.index = 10;
      fixture.detectChanges();

      selectRow();

      expect(component.onSelect.emit).toHaveBeenCalledWith({rowIndex:component.data.index, selected:true});
    });

    it('On select should be called for selected card', () => {
      spyOn(component.onSelect, 'emit');
      component.selectOnClick = true;
      component.data.index = 10;
      component.data.model.selected = true;
      fixture.detectChanges();

      selectRow();

      expect(component.onSelect.emit).toHaveBeenCalledWith({rowIndex:component.data.index, selected:false});
    });

    it('On select should be called several times', () => {
      // fake onSelect call
      spyOn(component.onSelect, 'emit').and.callFake(() => component.data.model.selected = !component.data.model.selected);
      component.selectOnClick = true;
      component.data.index = 10;
      component.data.model.selected = true;
      fixture.detectChanges();

      selectRow();

      expect(component.onSelect.emit).toHaveBeenCalledWith({rowIndex:component.data.index, selected:false});

      selectRow();

      expect((component.onSelect.emit as any).calls.allArgs()).toEqual([[{rowIndex:component.data.index, selected:false}], 
        [{rowIndex:component.data.index, selected:true}]]);

      expect(component.onSelect.emit).toHaveBeenCalledTimes(2);
    });
  });

  describe('Columns', () => {
    it('Columns container should not exist by default', () => {
      expect(fixture.nativeElement.querySelector('div.card-columns-container')).toBeNull();
    });

    it('Columns container should exist if columns exist', () => {
      component.data =   { model: { data: {field: 1} }, index: 10 };
      component.columns = [{ columnName: 'column', fieldName: 'field' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.card-columns-container')).toBeDefined();
    });

    it('Should have columns content count as columns count', () => {
      component.data =   { model: { data: {field: 1} }, index: 10 };
      component.columns = [{ columnName: 'column', fieldName: 'field' }, { columnName: 'column1', fieldName: 'field2' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('div.card-columns-container').length).toEqual(component.columns.length);
    });

    it('Should be created checkmark column', () => {
      component.data =   { model: { data: {field: 1} }, index: 10 };
      component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Selectable }];
      fixture.detectChanges();

      expect(el.query(By.css('div.column-checkmark'))).toBeDefined();
      expect(el.query(By.css('div.column-sequence'))).toBeNull();
      expect(el.query(By.css('div.column-data'))).toBeNull();
    });

    it('Should be created sequence column', () => {
      component.data =   { model: { data: {field: 1} }, index: 10 };
      component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Sequence }];
      fixture.detectChanges();

      expect(el.query(By.css('div.column-checkmark'))).toBeNull();
      expect(el.query(By.css('div.column-sequence'))).toBeDefined();
      expect(el.query(By.css('div.column-data'))).toBeNull();
    });

    it('Should be created data column', () => {
      component.data =   { model: { data: {field: 1} }, index: 10 };
      component.columns = [{ columnName: 'column', fieldName: 'field', type: TableColumnType.Data }];
      fixture.detectChanges();

      expect(el.query(By.css('div.column-checkmark'))).toBeNull();
      expect(el.query(By.css('div.column-sequence'))).toBeNull();
      expect(el.query(By.css('div.column-data'))).toBeDefined();
    });

    describe('Checkmark', () => {
      it('Should be exist check mark component', () => {
        component.data =   { model: { data: {field: 1} }, index: 10 };
        component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        expect(el.query(By.css('sfc-checkmark'))).toBeDefined();
      });

      it('Checkmark should not be checked', () => {
        component.data =   { model: { data: {field: 1} }, index: 10 };
        component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        expect(el.query(By.css('sfc-checkmark')).attributes['ng-reflect-checked']).toEqual('false');
      });

      it('Checkmark should be checked by defined value', () => {
        component.data =   { model: { data: {field: 1}, selected:true }, index: 10 };
        component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        expect(el.query(By.css('sfc-checkmark')).attributes['ng-reflect-checked']).toEqual('true');
      });

      it('Checkmark should be checked after click on component', () => {
        // fake onSelect call
        spyOn(component.onSelect, 'emit').and.callFake(() => component.data.model.selected = !component.data.model.selected);
        component.selectOnClick = true;
        component.data =   { model: { data: {field: 1} }, index: 10 };
        component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        selectRow();

        expect(el.query(By.css('sfc-checkmark')).attributes['ng-reflect-checked']).toEqual('true');
      });

      it('Checkmark should call select card', () => {
        spyOn(component.onSelect, 'emit');
        component.data =   { model: { data: {field: 1} }, index: 10 };
        component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(component.onSelect.emit).toHaveBeenCalled();
      });

      it('On select should be called for unselected card', () => {
        spyOn(component.onSelect, 'emit');
        component.data =   { model: { data: {field: 1} }, index: 10 };
        component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(component.onSelect.emit).toHaveBeenCalledWith({rowIndex:component.data.index, selected:true});
      });

      it('On select should be called for selected card', () => {
        spyOn(component.onSelect, 'emit');
        component.data =   { model: { data: {field: 1}, selected:true }, index: 10 };
        component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(component.onSelect.emit).toHaveBeenCalledWith({rowIndex:component.data.index, selected:false});
      });

      it('On select should be called several times', () => {
        // fake onSelect call
        spyOn(component.onSelect, 'emit').and.callFake(() => component.data.model.selected = !component.data.model.selected);
        component.data =   { model: { data: {field: 1}, selected:true }, index: 10 };
        component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(component.onSelect.emit).toHaveBeenCalledWith({rowIndex:component.data.index, selected:false});

        selectRowByCheckmark();

        expect((component.onSelect.emit as any).calls.allArgs()).toEqual([[{rowIndex:component.data.index, selected:false}], 
          [{rowIndex:component.data.index, selected:true}]]);

        expect(component.onSelect.emit).toHaveBeenCalledTimes(2);
      });
    });

    describe('Sequence', () => {
      it('Should have appropriate values when default state', () => {
        component.data =   { model: { data: {field: 1} }, index: 10 };
        component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Sequence }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.column-sequence span.column-name').innerText).toEqual('');
        expect(fixture.nativeElement.querySelectorAll('div.column-sequence span')[1].innerText).toEqual('');
      });

      it('Should have appropriate values', () => {
        component.data =   { model: { data: {field: 1} }, index: 10, sequenceNumber:100 };
        component.columns = [{ columnName: 'Sequence column', fieldName: '', type: TableColumnType.Sequence }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.column-sequence span.column-name').innerText).toEqual('SEQUENCE COLUMN');
        expect(fixture.nativeElement.querySelectorAll('div.column-sequence span')[1].innerText).toEqual('100');
      });
    });

    describe('Data', () => {
      it('Should have appropriate values when default state', () => {
        component.data =   { model: { data: {field: 1} }, index: 10 };
        component.columns = [{ columnName: '', fieldName: '', type: TableColumnType.Data }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.column-data span.column-name').innerText).toEqual('');
        expect(fixture.nativeElement.querySelectorAll('div.column-data span')[1].innerText).toEqual('');
      });

      it('Should have appropriate values', () => {
        component.data =   { model: { data: {field: 'test-data'} }, index: 10 };
        component.columns = [{ columnName: 'Column name', fieldName: 'field', type: TableColumnType.Data }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.column-data span.column-name').innerText).toEqual('COLUMN NAME');
        expect(fixture.nativeElement.querySelectorAll('div.column-data span')[1].innerText).toEqual('test-data');
      });
    });
  });

  function selectRow() {
    fixture.nativeElement.querySelector('div.card-container').dispatchEvent(new MouseEvent('click', {}));
    fixture.detectChanges();
  }

  function selectRowByCheckmark() {
    fixture.nativeElement.querySelector('div.column-checkmark').dispatchEvent(new MouseEvent('click', {}));
    fixture.detectChanges();
  }
});