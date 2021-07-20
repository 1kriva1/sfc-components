import { Component, Input } from '@angular/core';
import { CommonConstants, ComponentSize } from '../../common/constants/common-constants';
import { CommonUtils } from '../../common/utils/common-utils';
import { UIUtils } from '../../common/utils/ui-utils';
import SfcProgressBase from '../sfc-progress-base.component';

@Component({
    selector: 'sfc-progress-semi-circle',
    templateUrl: './sfc-progress-semi-circle.component.html',
    styleUrls: ['./sfc-progress-semi-circle.component.css', './sfc-progress-semi-circle-dark-theme.component.css']
})
export class SfcProgressSemiCircleComponent extends SfcProgressBase {

    @Input()
    limits: boolean = true;

    @Input()
    min: number = CommonConstants.MIN_VALUE;

    @Input()
    max: number = CommonConstants.FULL_PERCENTAGE;

    @Input()
    size: ComponentSize;

    @Input('custom-size')
    customSize: number;

    ngOnInit(): void {
        super.ngOnInit();

        if (!CommonUtils.isDefined(this.size)) {
            this.size = ComponentSize.Medium;
        }
    }

    get barStyles() {
        const color = this.getColor(this.progress),
            differenceLimits = this.max - this.min,
            rotateValue = 45 + (180 - ((this.max - this.progress) * 180 / differenceLimits));
        
        return {
            transform: `rotate(${UIUtils.getCssLikeDegrees(rotateValue)})`,
            borderBottomColor: color,
            borderRightColor: color
        }
    }

    get semiCircleStyles() {
        return this.customSize ? { fontSize: UIUtils.getCssLikePx(this.customSize) } : null;
    }
}