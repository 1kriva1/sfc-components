import { Component, Input } from '@angular/core';
import { CommonConstants } from '../../common/constants/common-constants';
import { CommonUtils } from '../../common/utils/common-utils';
import { UIUtils } from '../../common/utils/ui-utils';
import SfcProgressBase from '../sfc-progress-base.component';

@Component({
    selector: 'sfc-progress-line',
    templateUrl: './sfc-progress-line.component.html',
    styleUrls: ['./sfc-progress-line.component.css', './sfc-progress-line-dark-theme.component.css']
})
export class SfcProgressLineComponent extends SfcProgressBase {

    @Input()
    total: number;

    @Input('info-start')
    infoStart: string;

    @Input('info-end')
    infoEnd: string;

    @Input('clear-end')
    clearEnd: boolean;

    ngOnInit(): void {
        super.ngOnInit();

        //if we don't have a total aka no requirement, it's 100%.
        if (this.total === 0) {
            this.total = this.progress;
        } else if (!this.total) {
            this.total = CommonConstants.FULL_PERCENTAGE;
        }

        //if the progress is greater than the total, it's also 100%.
        if (this.progress > this.total) {
            this.progress = CommonConstants.FULL_PERCENTAGE;
            this.total = CommonConstants.FULL_PERCENTAGE;
        }

        if(!this.clearEnd &&CommonUtils.isNullOrEmptyString(this.infoEnd))
            this.infoEnd = this.progress.toString();
    }

    get progressValue() {
        return UIUtils.getCssLikePercentage((this.progress / this.total) * CommonConstants.FULL_PERCENTAGE);
    }
}