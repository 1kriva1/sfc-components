import { Component, HostBinding, ContentChildren, QueryList, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { CommonConstants, TabType } from '../common/constants/common-constants';
import BaseTabComponent from './sfc-tab/sfc-base-tab.component';
import { SfcIconTabComponent } from './sfc-tab/sfc-icon-tab/sfc-icon-tab.component';
import { SfcLineTabComponent } from './sfc-tab/sfc-line-tab/sfc-line-tab.component';

@Component({
    selector: 'sfc-tab-panel',
    templateUrl: './sfc-tab-panel.component.html',
    styleUrls: ['./sfc-tab-panel.component.css']
})
export class SfcTabPanelComponent implements AfterContentInit {

    @ContentChildren(BaseTabComponent)
    tabs: QueryList<BaseTabComponent>;

    private selectedIndex: number;

    @HostBinding('attr.type')
    private type: TabType;

    constructor(private changeDetector: ChangeDetectorRef) {
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    ngAfterContentInit() {
        this.type = this.getTabType(this.tabs.first);

        this.tabs.forEach((tab: BaseTabComponent, index) => {

            if (this.type == TabType.Icon)
                (tab as SfcIconTabComponent).width = `${(100 / this.tabs.length) + CommonConstants.CSS_PERCENTAGE}`;

            tab.onSelect.subscribe(() => {
                this.selectTab(tab);
                this.selectedIndex = index;
            });
        });

        this.setSelectedTab();
    }

    selectTab(tab: BaseTabComponent) {
        this.tabs.forEach(t => t.selected = false);
        tab.selected = true;
    }

    private setSelectedTab(){
        const selectedTab = this.tabs.find((t, index) => {
            if (t.selected) {
                this.selectedIndex = index;
                return true
            }
        });

        if (!selectedTab && this.tabs.first) {
            this.tabs.first.selected = true;
            this.selectedIndex = 0;
        }
    }

    private getTabType(tab: BaseTabComponent): TabType {
        if (tab instanceof SfcLineTabComponent) {
            return TabType.Line;
        } else if (this.tabs.first instanceof SfcIconTabComponent) {
            return TabType.Icon;
        }

        return TabType.Default;
    }
}