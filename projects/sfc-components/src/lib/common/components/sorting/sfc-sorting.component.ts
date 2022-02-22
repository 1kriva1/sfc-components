import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonConstants, SortingDirection, StyleClass } from '../../constants/common-constants';
import ISortingConfig from '../../interfaces/sfc-sorting/ISortingConfig';
import { SortingService } from '../../services/sorting/sorting.service';
import { CollectionUtils } from '../../utils/collection-utils';
import { CommonUtils } from '../../utils/common-utils';

@Component({
  selector: 'sfc-sorting',
  templateUrl: './sfc-sorting.component.html',
  styleUrls: ['./sfc-sorting.component.css', './sfc-sorting-dark-theme.component.css']
})
export class SfcSortingComponent implements OnInit, OnDestroy {

  SortingDirection = SortingDirection;

  @Input()
  id: string;

  @Input()
  config: ISortingConfig = { active: false, enabled: false };

  @HostBinding(`class.${StyleClass.Enabled}`)
  get enabled(): boolean {
    return this.config.enabled;
  }

  @HostBinding(`class.${StyleClass.Active}`)
  get active(): boolean {
    return this.config.active;
  }

  @HostListener('click')
  sort() {
    if (this.enabled) {

      if (this.active) {
        this.config.direction = this.config.direction === SortingDirection.Ascending
          ? SortingDirection.Descending
          : SortingDirection.Ascending;
      }

      this.sortingService.sort({ sortingId: this.id, direction: this.config.direction });
    }
  }

  private columnSortedSubscription: Subscription;

  constructor(public sortingService: SortingService) { }

  getIcon(direction: SortingDirection) {
    const descIcon = CollectionUtils.getItem(this.config.icons, i => i.direction == direction);
    return descIcon ? descIcon.icon : direction == SortingDirection.Ascending
      ? CommonConstants.SORTING_DEFAULT_ICONS.ASC_ICON
      : CommonConstants.SORTING_DEFAULT_ICONS.DESC_ICON;
  }

  ngOnInit() {
    if (!CommonUtils.isDefined(this.config))
      this.config = { active: false, enabled: false, direction: SortingDirection.Ascending }

    // subscribe to sort changes so we can react when other columns are sorted
    this.columnSortedSubscription = this.sortingService.sorting$.subscribe(event => {
      // reset this column's sort direction to hide the sort icons
      if (this.id != event.sortingId) {
        this.config.direction = SortingDirection.Ascending;
      }
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }
}