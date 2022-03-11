import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PositionSideType } from '../../../common/constants/common-constants';
import { SfcComponentsModule } from '../../../sfc-components.module';
import { SfcExpandedTableRowComponent } from './sfc-expanded-table-row.component';

describe('Component: SfcExpandedTableRowComponent', () => {
  let component: SfcExpandedTableRowComponent;
  let fixture: ComponentFixture<SfcExpandedTableRowComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SfcExpandedTableRowComponent);
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
      expect(fixture.nativeElement.querySelector('div.row-container')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.row-inner-container')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.row-content')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.content-template-container')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.expand-toggler')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.row-expanded-content')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.expanded-content-template-container')).toBeDefined();
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

    it('Expanded property by default', () => {
      expect(component.expanded).toBeFalsy();
    });

    it('Expanded property when click row content', () => {
      fixture.nativeElement.querySelector('div.row-content').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.expanded).toBeTruthy();

      fixture.nativeElement.querySelector('div.row-content').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.expanded).toBeFalsy();
    });

    it('Content data value by default', () => {
      expect(component.contentData).toEqual({
        data: { model: { data: null }, index: undefined },
        columns: [],
        columnWidth: 1,
        columnPosition: PositionSideType.Start,
        expanded: false
      });
    });

    it('Content data value with defined inputs', () => {
      component.columnWidth = 6;
      component.columnPosition = PositionSideType.End;
      component.data = { model: { data: { field: 1 } }, index: 0 };
      component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' },
      { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
      fixture.detectChanges();

      fixture.nativeElement.querySelector('div.row-content').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.contentData).toEqual({
        data: component.data,
        columns: component.columns,
        columnWidth: 5,
        columnPosition: component.columnPosition,
        expanded: true
      });
    });
  });

  describe('Content', () => {
    it('Expanded content by default', () => {
      expect(el.query(By.css('.row-expanded-content')).nativeElement.clientHeight > 0).toBeFalsy();
    });

    it('Expanded content when expanded = TRUE', async(() => {
      fixture.nativeElement.querySelector('div.row-content').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      setTimeout(() => {
        expect(el.query(By.css('.row-expanded-content')).nativeElement.clientHeight > 0).toBeTruthy();
      }, 100);
    }));

    it('Content width value', () => {
      component.columnWidth = 6;
      component.columns = [{ columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' },
      { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }, { columnName: '', fieldName: '' }];
      fixture.detectChanges();

      expect(el.query(By.css('.content-template-container > div')).styles.width).toEqual('83.33333333333334%');
    });

    describe('Toggler', () => {
      it('Width value', () => {
        component.columnWidth = 5;
        fixture.detectChanges();

        expect(el.query(By.css('.expand-toggler')).styles.width).toEqual('calc(100% / 5)');
      });

      it('Icon when not expanded', () => {
        expect(el.query(By.css('.expand-toggler i.fa.fa-angle-down'))).toBeDefined();
        expect(el.query(By.css('.expand-toggler i.fa.fa-angle-up'))).toBeNull();
      });

      it('Icon when expanded', () => {
        fixture.nativeElement.querySelector('div.row-content').dispatchEvent(new MouseEvent('click', {}));
        fixture.detectChanges();

        expect(el.query(By.css('.expand-toggler i.fa.fa-angle-up'))).toBeDefined();
        expect(el.query(By.css('.expand-toggler i.fa.fa-angle-down'))).toBeNull();
      });
    });
  });
});

@Component({
  template: `<ng-template #contentRef let-content>
              <div class="content-ref">
                <span class="content-width">{{content.columnWidth}}</span>
                <span class="content-position">{{content.columnPosition}}</span>
                <span class="content-expanded">{{content.expanded}}</span>
                <span class="content-column-first">{{content.columns[0].columnName}}</span>
                <span class="content-data">{{content.data.model.data.field}}</span>
              </div>
            </ng-template>  
            
            <ng-template #expandedContentRef let-content>
              <div class="expanded-content-ref">
                <span class="content-width">{{content.columnWidth}}</span>
                <span class="content-position">{{content.columnPosition}}</span>
                <span class="content-expanded">{{content.expanded}}</span>
                <span class="content-column-first">{{content.columns[0].columnName}}</span>
                <span class="content-data">{{content.data.model.data.field}}</span>
              </div>
            </ng-template>

           <sfc-expanded-table-row>

            <div *ngIf="showContent">              
             <ng-template template="row-content" let-content>
              <div class="content-template">
                <span class="content-width">{{content.columnWidth}}</span>
                <span class="content-position">{{content.columnPosition}}</span>
                <span class="content-expanded">{{content.expanded}}</span>
                <span class="content-column-first">{{content.columns[0].columnName}}</span>
                <span class="content-data">{{content.data.model.data.field}}</span>
              </div>
             </ng-template>
            </div>

            <div *ngIf="showContent">
             <ng-template template="row-expanded-content" let-content>
              <div class="expanded-content-template">
                <span class="content-width">{{content.columnWidth}}</span>
                <span class="content-position">{{content.columnPosition}}</span>
                <span class="content-expanded">{{content.expanded}}</span>
                <span class="content-column-first">{{content.columns[0].columnName}}</span>
                <span class="content-data">{{content.data.model.data.field}}</span>
              </div>
             </ng-template>
            </div>
           </sfc-expanded-table-row>`
})
class TestSfcExpandedTableRowComponent {

  @ViewChild(SfcExpandedTableRowComponent, { static: false })
  expandedTableRow: SfcExpandedTableRowComponent;

  @ViewChild('contentRef', { static: false })
  contentTemplateRef: TemplateRef<any>;

  @ViewChild('expandedContentRef', { static: false })
  expandedContentTemplateRef: TemplateRef<any>;

  showContent: boolean = false;
}

describe('Component: SfcExpandedTableRowComponent (templates)', () => {
  let component: TestSfcExpandedTableRowComponent;
  let fixture: ComponentFixture<TestSfcExpandedTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SfcComponentsModule],
      declarations: [TestSfcExpandedTableRowComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TestSfcExpandedTableRowComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  describe('Content', () => {
    it("Should add content from template reference", async(() => {
      component.expandedTableRow.columns = [{ columnName: 'content-column-name-reference', fieldName: '' }];
      component.expandedTableRow.columnWidth = 6;
      component.expandedTableRow.columnPosition = PositionSideType.End;
      component.expandedTableRow.data = { model: { data: { field: 'test' } }, index: 0 };
      component.expandedTableRow.contentTemplateRef = component.contentTemplateRef;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.content-ref > span.content-width').innerText).toEqual('5');
      expect(fixture.nativeElement.querySelector('div.content-ref > span.content-position').innerText).toEqual('end');
      expect(fixture.nativeElement.querySelector('div.content-ref > span.content-expanded').innerText).toEqual('false');
      expect(fixture.nativeElement.querySelector('div.content-ref > span.content-column-first').innerText).toEqual('content-column-name-reference');
      expect(fixture.nativeElement.querySelector('div.content-ref > span.content-data').innerText).toEqual('test');
    }));

    it("Should add content from template content", async(() => {
      component.showContent = true;
      component.expandedTableRow.columns = [{ columnName: 'content-column-name-content', fieldName: '' }];
      component.expandedTableRow.columnWidth = 6;
      component.expandedTableRow.columnPosition = PositionSideType.End;
      component.expandedTableRow.data = { model: { data: { field: 'test' } }, index: 0 };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.content-template > span.content-width').innerText).toEqual('5');
      expect(fixture.nativeElement.querySelector('div.content-template > span.content-position').innerText).toEqual('end');
      expect(fixture.nativeElement.querySelector('div.content-template > span.content-expanded').innerText).toEqual('false');
      expect(fixture.nativeElement.querySelector('div.content-template > span.content-column-first').innerText).toEqual('content-column-name-content');
      expect(fixture.nativeElement.querySelector('div.content-template > span.content-data').innerText).toEqual('test');
    }));
  });

  describe('Expanded content', () => {
    it("Should add expanded content from template reference", async(() => {
      component.expandedTableRow.columns = [{ columnName: 'expanded-content-column-name-reference', fieldName: '' }];
      component.expandedTableRow.columnWidth = 6;
      component.expandedTableRow.columnPosition = PositionSideType.End;
      component.expandedTableRow.data = { model: { data: { field: 'test' } }, index: 0 };
      component.expandedTableRow.expandedContentTemplateRef = component.expandedContentTemplateRef;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.expanded-content-ref > span.content-width').innerText).toEqual('5');
      expect(fixture.nativeElement.querySelector('div.expanded-content-ref > span.content-position').innerText).toEqual('end');
      expect(fixture.nativeElement.querySelector('div.expanded-content-ref > span.content-expanded').innerText).toEqual('false');
      expect(fixture.nativeElement.querySelector('div.expanded-content-ref > span.content-column-first').innerText).toEqual('expanded-content-column-name-reference');
      expect(fixture.nativeElement.querySelector('div.expanded-content-ref > span.content-data').innerText).toEqual('test');
    }));

    it("Should add expanded content from template content", async(() => {
      component.showContent = true;
      component.expandedTableRow.columns = [{ columnName: 'expanded-content-column-name-content', fieldName: '' }];
      component.expandedTableRow.columnWidth = 6;
      component.expandedTableRow.columnPosition = PositionSideType.End;
      component.expandedTableRow.data = { model: { data: { field: 'test' } }, index: 0 };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.expanded-content-template > span.content-width').innerText).toEqual('5');
      expect(fixture.nativeElement.querySelector('div.expanded-content-template > span.content-position').innerText).toEqual('end');
      expect(fixture.nativeElement.querySelector('div.expanded-content-template > span.content-expanded').innerText).toEqual('false');
      expect(fixture.nativeElement.querySelector('div.expanded-content-template > span.content-column-first').innerText).toEqual('expanded-content-column-name-content');
      expect(fixture.nativeElement.querySelector('div.expanded-content-template > span.content-data').innerText).toEqual('test');
    }));
  });
});
