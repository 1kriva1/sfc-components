import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants, ComponentSize, StarTypes } from '../common/constants/common-constants';
import ISize from '../common/interfaces/ISize';
import { CommonUtils } from '../common/utils/common-utils';
import { UIUtils } from '../common/utils/ui-utils';

@Component({
    selector: 'sfc-stars',
    templateUrl: './sfc-stars.component.html',
    styleUrls: ['./sfc-stars.component.css', './sfc-stars-dark-theme.component.css']
})
export class SfcStarsComponent implements OnInit {

    @Input()
    value: number = 0;

    @Input()
    count: number = CommonConstants.DEFAULT_STARS_COUNT;

    @Input()
    size: ComponentSize;

    @Input('custom-size')
    customSize: ISize;

    stars: Array<any>;

    ngOnInit(): void {
        this.stars = new Array(this.count);

        if (!CommonUtils.isDefined(this.size) && !CommonUtils.isDefined(this.customSize)) {
            this.size = ComponentSize.Medium
        }
    }

    get starStyles() {
        return this.customSize ?
            {
                width: UIUtils.getCssLikePx(this.customSize.width),
                height: UIUtils.getCssLikePx(this.customSize.height)
            }
            : null;
    }

    getStarClass(index: number) {

        if ((index - this.value) >= 1) {
            return StarTypes.None;
        }

        if (this.value >= index) {
            return StarTypes.Full;
        }

        const part = this.value - Math.floor(this.value);

        if (part < 0.25 || (part >= 0.25 && part < 0.5)) {
            return StarTypes.S25;
        }

        if (part >= 0.5 && part < 0.75) {
            return StarTypes.S50;
        }

        if (part >= 0.75) {
            return StarTypes.S75;
        }

        return StarTypes.Full;
    }
}