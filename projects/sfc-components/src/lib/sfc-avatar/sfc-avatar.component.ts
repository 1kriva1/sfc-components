import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants } from '../common/constants/common-constants';
import IAvatarBadgeConfig from '../common/interfaces/sfc-avatar/IAvatarBadgeConfig';
import IAvatarInfo from '../common/interfaces/sfc-avatar/IAvatarInfo';
import { CommonUtils } from '../common/utils/common-utils';
import { UIUtils } from '../common/utils/ui-utils';

@Component({
    selector: 'sfc-avatar',
    templateUrl: './sfc-avatar.component.html',
    styleUrls: ['./sfc-avatar.component.css', './sfc-avatar-dark-theme.component.css']
})
export class SfcAvatarComponent implements OnInit {

    @Input()
    radius: number = CommonConstants.AVATAR_DEFAULTS.RADIUS;

    @Input()
    stroke: number = CommonConstants.AVATAR_DEFAULTS.STROKE;

    @Input()
    progress: number = CommonConstants.AVATAR_DEFAULTS.PROGRESS;

    @Input('progress-color')
    progressBarColor: string = CommonConstants.AVATAR_DEFAULTS.AVATAR_PROGRESS_BAR_COLORS.DEFAULT;

    @Input('progress-color-filled')
    progressBarFilledColor: string = CommonConstants.AVATAR_DEFAULTS.AVATAR_PROGRESS_BAR_COLORS.FILLED;

    @Input('info')
    avatarInfo: IAvatarInfo;

    @Input('show-stars')
    showStars: boolean = false;

    normalizedRadius: number;

    circumference: number;

    height: number;

    width: number;

    imgRadius: number;

    imgId: string;

    ngOnInit(): void {
        this.avatarInfo = CommonUtils.isDefined(this.avatarInfo)
            ? this.avatarInfo
            : { rating: 0, firstName: '', lastName: '', position: '', avatarSrc: CommonConstants.AVATAR_DEFAULTS.AVATAR_IMAGE };
        this.normalizedRadius = this.radius - this.stroke * 2
        this.circumference = this.normalizedRadius * 2 * Math.PI;
        this.height = this.width = this.radius * 2;
        this.imgRadius = this.normalizedRadius - (this.normalizedRadius * 0.15);
        this.imgId = Math.random() + this.avatarInfo.avatarSrc.split(/(\\|\/)/g).pop();
    }

    get strokeDashoffset() {
        return this.circumference - (this.progress / 100 * this.circumference);
    }

    get ratingBadgeConfig(): IAvatarBadgeConfig{
        const badgeSize = UIUtils.getCssLikePx(this.radius * 0.375);
        return {
            height: badgeSize,
            width: badgeSize,
            right: UIUtils.getCssLikePercentage(20),
            bottom: UIUtils.getCssLikePercentage(14),
            background: this.progressBarFilledColor
        };
    }

    get injuredBadgeConfig(): IAvatarBadgeConfig {
        const badgeSize = UIUtils.getCssLikePx(this.radius * 0.25);
        return {
            height: badgeSize,
            width: badgeSize,
            right: UIUtils.getCssLikePercentage(23),
            top: UIUtils.getCssLikePercentage(0),
            background: CommonConstants.AVATAR_DEFAULTS.INJURED_BADGE_BACKGROUND
        }
    }

    get captainBadgeConfig(): IAvatarBadgeConfig {
        const badgeSize = UIUtils.getCssLikePx(this.radius * 0.25);
        return {
            height: badgeSize,
            width: badgeSize,
            right: UIUtils.getCssLikePercentage(4),
            bottom: UIUtils.getCssLikePercentage(50),
            background: CommonConstants.AVATAR_DEFAULTS.CAPTAIN_BADGE_BACKGROUND
        }
    }

    get starsValue(){
        return this.avatarInfo.rating * CommonConstants.DEFAULT_STARS_COUNT / 100;
    }
}