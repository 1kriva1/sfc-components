import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TimeLinePosition } from '../../common/constants/common-constants';
import ITimeLineItem from '../../common/interfaces/sfc-timeline/ITimeLineItem';
import { CommonUtils } from '../../common/utils/common-utils';

@Component({
    selector: 'sfc-timeline-item',
    templateUrl: './sfc-timeline-item.component.html',
    styleUrls: ['./sfc-timeline-item.component.css', './sfc-timeline-item-dark-theme.component.css']
})
export class SfcTimeLineItemComponent implements OnInit {

    @Input()
    item: ITimeLineItem;

    @HostBinding('class')
    get position() {
        return this.item ? this.item.position : null;
    }

    get iconClass() {
        const classes = {};

        if (this.item.icon) {
            // example: fa fa-star
            const iconParts = this.item.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        return classes;
    }

    ngOnInit(): void {
        this.item = CommonUtils.isDefined(this.item) ? this.item : { title: '', dateTimeLabel: '', position: TimeLinePosition.Left };
    }
}