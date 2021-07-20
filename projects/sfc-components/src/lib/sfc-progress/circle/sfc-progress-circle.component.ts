import { Component, Input } from '@angular/core';
import { ComponentSize } from '../../common/constants/common-constants';
import { CommonUtils } from '../../common/utils/common-utils';
import { UIUtils } from '../../common/utils/ui-utils';
import SfcProgressBase from '../sfc-progress-base.component';

@Component({
    selector: 'sfc-progress-circle',
    templateUrl: './sfc-progress-circle.component.html',
    styleUrls: ['./sfc-progress-circle.component.css', './sfc-progress-circle-dark-theme.component.css']
})
export class SfcProgressCircleComponent extends SfcProgressBase {

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

    get transformRotate() {
        return `rotate(${UIUtils.getCssLikeDegrees((this.progress * 360) / 100)})`;
    }

    get circleStyles() {
        return this.customSize ? { fontSize: UIUtils.getCssLikePx(this.customSize) } : null;
    }
}