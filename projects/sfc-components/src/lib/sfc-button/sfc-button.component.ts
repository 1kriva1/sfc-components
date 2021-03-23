import { Component, Input, OnInit } from '@angular/core';
import { ButtonType, CommonConstants, ComponentSize, StyleClass } from '../common/constants/common-constants';
import ISize from '../common/interfaces/ISize';
import { CollectionUtils } from '../common/utils/collection-utils';
import { CommonUtils } from '../common/utils/common-utils';
import { UIUtils } from '../common/utils/ui-utils';

@Component({
    selector: 'sfc-button',
    templateUrl: './sfc-button.component.html',
    styleUrls: ['./sfc-button.component.css', './sfc-button-dark-theme.component.css']
})
export class ButtonComponent implements OnInit {

    @Input()
    id: string;

    @Input()
    text: string;

    @Input('icon-before')
    iconBefore: string;

    @Input('icon-after')
    iconAfter: string;

    @Input()
    disabled: boolean;

    @Input()
    types: Array<ButtonType>;

    @Input()
    size: ComponentSize;

    @Input('custom-size')
    customSize: ISize;

    ngOnInit(): void {
        if (!CommonUtils.isDefined(this.text)) {
            this.text = CommonConstants.BUTTON_DEFAULT_TEXT;
        }

        if (!CommonUtils.isDefined(this.types)) {
            this.types = [ButtonType.Bordered];
        }

        if (!CommonUtils.isDefined(this.size)) {
            this.size = ComponentSize.Medium
        }
    }

    get buttonClasses() {
        const classes = {}

        if(this.disabled)
            classes[StyleClass.Disabled] = true;

        if (!this.customSize)
            classes[this.size] = true;

        CollectionUtils.distinct(this.types).forEach(type => classes[type] = true);

        return classes;
    }

    get buttonStyles() {
        return this.customSize ?
          {
            width: UIUtils.getCssLikePx(this.customSize.width),
            height: UIUtils.getCssLikePx(this.customSize.height)
          }
          : null;
      }

    getIconClass(iconValue: string) {
        const classes = {};

        if (iconValue) {
            // example: fa fa-star
            const iconParts = iconValue.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        return classes;
    }
}