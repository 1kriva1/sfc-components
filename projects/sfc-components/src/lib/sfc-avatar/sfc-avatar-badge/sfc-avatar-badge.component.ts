import { Component, Input } from '@angular/core';
import IAvatarBadgeConfig from '../../common/interfaces/sfc-avatar/IAvatarBadgeConfig';
import { UIUtils } from '../../common/utils/ui-utils';

@Component({
    selector: 'sfc-avatar-badge',
    templateUrl: './sfc-avatar-badge.component.html',
    styleUrls: ['./sfc-avatar-badge.component.css']
})
export class SfcAvatarBadgeComponent {

    @Input()
    radius: number = 0;

    @Input()
    icon: string;

    @Input()
    config: IAvatarBadgeConfig = {};

    get iconClass() {
        const classes = {};

        if (this.icon) {
            // example: fa fa-star
            const iconParts = this.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        return classes;
    }

    get additionalBadgeStyles() {
        return {
            top: this.config.top,
            bottom: this.config.bottom,
            left: this.config.left,
            right: this.config.right,
            color: this.config.color,
            backgroundColor: this.config.background,
            height: this.config.height,
            width: this.config.width,
            fontSize: UIUtils.getCssLikePx(this.radius * 0.2)
        };
    }
}