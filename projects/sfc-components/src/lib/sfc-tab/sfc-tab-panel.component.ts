import { Component, HostBinding, Input, OnInit, ContentChildren, QueryList, AfterContentInit, TemplateRef } from '@angular/core';
import { SfcTabComponent } from './sfc-tab.component';

@Component({
    selector: 'sfc-tab-panel',
    templateUrl: './sfc-tab-panel.component.html',
    styleUrls: ['./sfc-tab-panel.component.css']
})
export class SfcTabPanelComponent implements AfterContentInit {


    @ContentChildren(SfcTabComponent)
    tabs: QueryList<SfcTabComponent>;

    @Input()
    headerTemplate: TemplateRef<any>;

    constructor() {
    }

    ngAfterContentInit() {
        const selectedTab = this.tabs.find(t=>t.selected);

        if(!selectedTab && this.tabs.first){
            this.tabs.first.selected = true;
        }
    }

    selectTab(tab: SfcTabComponent){
        this.tabs.forEach(t=>t.selected = false);
        tab.selected = true;
    }

    get tabsContext(){
        return {
            tabs: this.tabs
        }
    }
}