import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SfcDefaultTableColumnComponent } from './sfc-default-table-column.component';
import { SfcComponentsModule } from '../../../../sfc-components.module';

describe('Component: SfcDefaultTableColumnComponent', () => {
  let component: SfcDefaultTableColumnComponent;
  let fixture: ComponentFixture<SfcDefaultTableColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SfcDefaultTableColumnComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  describe('General', () => {
    it('Should create component', () => {
      expect(component).toBeTruthy();
    });

    it('Main elements', () => {
      expect(fixture.nativeElement.querySelector('div.column')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.name span.column-label')).toBeDefined();
    });
  });

  describe('Icon', () => {
    it('Not exist by default', () => {
      expect(fixture.nativeElement.querySelector('div.icon i')).toBeNull();
    });

    it('Should create if icon value provided', () => {
      component.column = { columnName: 'column_1', fieldName:'',icon: 'fa fa-test' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icon i')).toBeDefined();
    });

    it('Icon class value', () => {
      component.column = { columnName: 'column_1', fieldName:'',icon: 'fa fa-test' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icon i').className).toEqual('fa fa-test');
    });
  });

  describe('Label', () => {
    it('Has not value by default', () => {
      expect(fixture.nativeElement.querySelector('div.label span.column-label').innerText).toEqual('');
    });

    it('Label when value provided', () => {
      component.column = { columnName: 'column_1', fieldName:'' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.label span.column-label').innerText).toEqual(component.column.columnName.toLocaleUpperCase());
    });
  });
});