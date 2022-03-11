import {
  AfterViewInit, Component, ElementRef, EventEmitter,
  Input, OnDestroy, Output, ViewChild
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'expanded-row-item',
  templateUrl: './expanded-row-item.component.html',
  styleUrls: ['./expanded-row-item.component.css']
})
export class ExpandedRowItemComponent implements AfterViewInit, OnDestroy {

  @Input()
  index: number;

  @Input()
  data: any;

  @Input('column-width')
  columnWidth: number;

  @Input('column-position')
  columnPosition: string;

  @Input()
  expanded: boolean;

  @Output('on-select')
  onSelect: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('columnCheckmark', { static: false, read: ElementRef })
  columnCheckmarkEl: ElementRef;

  columnCheckmarkOnClickSubscription: Subscription;

  ngAfterViewInit(): void {
    if (this.columnCheckmarkEl) {
      this.columnCheckmarkOnClickSubscription = fromEvent(this.columnCheckmarkEl.nativeElement, 'click').subscribe((event: PointerEvent) => {
        event.stopPropagation();
        this.selectRow();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.columnCheckmarkOnClickSubscription)
      this.columnCheckmarkOnClickSubscription.unsubscribe();
  }

  get columnStyle(): { width: string } {
    return {
      width: `calc(100% / ${this.columnWidth})`
    };
  }

  selectRow() {
    if (this.onSelect)
      this.onSelect.emit({ rowIndex: this.index, selected: !this.data.selected });
  }
}