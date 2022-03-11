import {
  Component, ContentChildren, HostBinding,
  Input, QueryList, TemplateRef
} from '@angular/core';
import { CommonConstants, PositionSideType, StyleClass } from '../../../common/constants/common-constants';
import { TemplateReferenceDirective } from '../../../common/directives/template-reference/template-reference.directive';
import { IColumnConfig } from '../../../common/interfaces/sfc-table/IColumnModel';
import IDataConfig from '../../../common/interfaces/sfc-table/IDataConfig';
import { CollectionUtils } from '../../../common/utils/collection-utils';

@Component({
  selector: 'sfc-expanded-table-row',
  templateUrl: './sfc-expanded-table-row.component.html',
  styleUrls: ['./sfc-expanded-table-row.component.css']
})
export class SfcExpandedTableRowComponent {

  @Input()
  data: IDataConfig = { model: { data: null }, index: undefined };

  @Input()
  columns: IColumnConfig[] = [];

  @Input('column-position')
  columnPosition: PositionSideType = PositionSideType.Start;

  @Input('column-width')
  columnWidth: number = 1;

  @HostBinding('class.' + StyleClass.Expanded)
  expanded: boolean = false;

  // TEMPLATES

  @Input('content-template-ref')
  contentTemplateRef: TemplateRef<any>;

  @Input('expanded-content-template-ref')
  expandedContentTemplateRef: TemplateRef<any>;

  // END TEMPLATES

  @ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
  private templates: QueryList<TemplateReferenceDirective> | undefined;

  get rowContentTemplate(): TemplateReferenceDirective {
    return CollectionUtils.getItem(this.templates.toArray(),
      t => t.templateName == CommonConstants.TABLE_DEFAULTS.TEMPLATE.ROW_CONTENT);
  }

  get rowExpandedContentTemplate(): TemplateReferenceDirective {
    return CollectionUtils.getItem(this.templates.toArray(),
      t => t.templateName == CommonConstants.TABLE_DEFAULTS.TEMPLATE.ROW_EXPANDED_CONTENT);
  }

  get isEven(): boolean {
    return (this.data.index + 1) % 2 == 0;
  }

  get contentStyle(): { width: string } {
    return {
      width: `${Math.min(100, (100 / this.columnWidth) * (this.columns.length - 1))}%`
    };
  }

  get togglerStyle(): { width: string } {
    return {
      width: `calc(100% / ${this.columnWidth})`
    };
  }

  get contentData():any{
    return {
      data: this.data, 
      columns: this.columns, 
      columnWidth: Math.max(1, this.columnWidth - 1), 
      columnPosition: this.columnPosition, 
      expanded: this.expanded
    }
  }
}