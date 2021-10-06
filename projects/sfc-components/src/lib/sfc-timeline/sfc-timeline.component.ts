import { Component, Input, OnInit } from '@angular/core';
import ITimeLineConfig from '../common/interfaces/sfc-timeline/ITimeLineConfig';
import { CommonUtils } from '../common/utils/common-utils';

@Component({
    selector: 'sfc-timeline',
    templateUrl: './sfc-timeline.component.html',
    styleUrls: ['./sfc-timeline.component.css', './sfc-timeline-dark-theme.component.css']
})
export class SfcTimeLineComponent implements OnInit {

    @Input()
    config: ITimeLineConfig;

    ngOnInit(): void {
        this.config = CommonUtils.isDefined(this.config) ? this.config : { items: [] };
    }
}