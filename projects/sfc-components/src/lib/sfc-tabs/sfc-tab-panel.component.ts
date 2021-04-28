import { Component, HostBinding, ContentChildren, QueryList, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { TabType } from '../common/constants/common-constants';
import { SfcIconTabComponent } from './sfc-tab/sfc-icon-tab/sfc-icon-tab.component';
import { SfcLineTabComponent } from './sfc-tab/sfc-line-tab/sfc-line-tab.component';
import { startWith, map, delay } from "rxjs/operators";
import { CollectionUtils } from '../common/utils/collection-utils';
import { SfcTabItemComponent } from './tabs-base/sfc-tab-item.component';
import { CommonUtils } from '../common/utils/common-utils';

@Component({
    selector: 'sfc-tab-panel',
    templateUrl: './sfc-tab-panel.component.html',
    styleUrls: ['./sfc-tab-panel.component.css', './sfc-tab-panel-dark-theme.component.css']
})
export class SfcTabPanelComponent implements AfterContentInit, AfterContentChecked {

    @ContentChildren(SfcTabItemComponent)
    tabs: QueryList<SfcTabItemComponent>;

    tabItems$: Observable<SfcTabItemComponent[]>;

    // current active tab
    activeTab: SfcTabItemComponent;

    @HostBinding('attr.type')
    get type(): TabType {
        return this.getTabType(CollectionUtils.getItem(this.tabs.toArray(), (tab: SfcTabItemComponent) =>
            CommonUtils.isDefined(tab.labelComponent)
            && CommonUtils.isDefined(tab.labelComponent.labelContent)));
    }

    // return selected index of tabs
    get selectedIndex() {
        return this.tabs.toArray().indexOf(this.activeTab)
    }

    ngAfterContentInit(): void {
        this.tabs.toArray().forEach(tab => {
            if (tab.labelComponent && tab.labelComponent.labelContent) {
                tab.labelComponent.labelContent.disabled = tab.disabled;
                tab.labelComponent.labelContent.selected = tab.selected;
            }

        })

        this.tabItems$ = this.tabs.changes
            .pipe(startWith(''))
            .pipe(delay(0))
            .pipe(map(() => this.tabs.toArray()));
    }

    ngAfterContentChecked() {
        //choose the default tab
        // we need to wait for a next VM turn,
        // because Tab item content, will not be initialized yet
        if (!this.activeTab) {
            Promise.resolve().then(() => {
                this.activeTab = CollectionUtils.getItem(this.tabs.toArray(), (tab: SfcTabItemComponent) => tab.selected)
                    || this.tabs.first;

                if (CommonUtils.isDefined(this.activeTab))
                    this.setActiveTabSelected(true);
            });
        }
    }

    selectTab(tabItem: SfcTabItemComponent) {

        if (tabItem.disabled || this.activeTab === tabItem) {
            return;
        }

        if (this.activeTab) {
            this.setActiveTabSelected(false);
        }

        this.activeTab = tabItem;
        this.setActiveTabSelected(true);
    }

    private getTabType(tabItem: SfcTabItemComponent): TabType {

        if (CommonUtils.isDefined(tabItem)) {
            const tab = tabItem.labelComponent.labelContent;

            if (tab instanceof SfcLineTabComponent) {
                return TabType.Line;
            } else if (tab instanceof SfcIconTabComponent) {
                return TabType.Icon;
            }
        }

        return TabType.Default;
    }

    private setActiveTabSelected(selected: boolean) {
        this.activeTab.selected = selected;

        if (this.activeTab.labelComponent && this.activeTab.labelComponent.labelContent)
            this.activeTab.labelComponent.labelContent.selected = selected;
    }
}