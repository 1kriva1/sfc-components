import { Input, OnInit } from "@angular/core";
import { CommonConstants } from "../common/constants/common-constants";
import { CommonUtils } from "../common/utils/common-utils";

export default abstract class SfcProgressBase implements OnInit {

    @Input()
    progress: number;

    @Input()
    getColor: (value: number) => string;

    ngOnInit(): void {
        //if we don't have progress, set it to 0.
        if (!this.progress) {
            this.progress = CommonConstants.MIN_VALUE;
        }

        if (!CommonUtils.isDefined(this.getColor))
            this.getColor = this.getDefaultColor;
    }

    getDefaultColor(value: number): string {
        if (value < 12) {
            return CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_LOW;
        } else if (value >= 12 && value < 24) {
            return CommonConstants.PROGRESS_DEFAULT_COLORS.LOW;
        } else if (value >= 24 && value < 36) {
            return CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_LOW;
        } else if (value >= 36 && value < 48) {
            return CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_MEDIUM;
        } else if (value >= 48 && value < 60) {
            return CommonConstants.PROGRESS_DEFAULT_COLORS.MEDIUM;
        } else if (value >= 60 && value < 72) {
            return CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_MEDIUM;
        } else if (value >= 72 && value < 84) {
            return CommonConstants.PROGRESS_DEFAULT_COLORS.MIN_HIGH;
        } else if (value >= 84 && value < 96) {
            return CommonConstants.PROGRESS_DEFAULT_COLORS.HIGH;
        } else {
            return CommonConstants.PROGRESS_DEFAULT_COLORS.MAX_HIGH;
        }
    }
}