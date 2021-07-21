import { Component, Input, OnInit } from '@angular/core';
import { ComponentSize } from '../../common/constants/common-constants';
import ITagItem from '../../common/interfaces/sfc-tags/ITagItem';
import { CommonUtils } from '../../common/utils/common-utils';
import { UIUtils } from '../../common/utils/ui-utils';

@Component({
    selector: 'sfc-tag',
    templateUrl: './sfc-tag.component.html',
    styleUrls: ['./sfc-tag.component.css', './sfc-tag-dark-theme.component.css']
})
export class SfcTagComponent implements OnInit {

    @Input()
    tag: ITagItem;

    ngOnInit(): void {
        if (!CommonUtils.isDefined(this.tag))
            this.tag = { label: '' };

        if (!CommonUtils.isDefined(this.tag.size)) {
            this.tag.size = ComponentSize.Medium;
        }
    }

    get tagStyles() {
        return this.tag.customSize ? { fontSize: UIUtils.getCssLikePx(this.tag.customSize) } : null;
    }

    get iconClass() {
        const classes = {};

        if (this.tag.icon) {
            // example: fa fa-star
            const iconParts = this.tag.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        return classes;
    }
}