import { Component, Input, OnInit } from '@angular/core';
import ISize from '../../common/interfaces/ISize';
import ISliderItemConfig from '../../common/interfaces/sfc-slider/ISliderItemConfig';
import { CommonUtils } from '../../common/utils/common-utils';
import { UIUtils } from '../../common/utils/ui-utils';

@Component({
    selector: 'sfc-slider-item',
    templateUrl: './sfc-slider-item.component.html',
    styleUrls: ['./sfc-slider-item.component.css', './sfc-slider-item-dark-theme.component.css']
})
export class SfcSliderItemComponent implements OnInit {

    @Input()
    item: ISliderItemConfig;

    @Input()
    size: ISize;

    ngOnInit(): void {
        this.item = CommonUtils.isDefined(this.item) ? this.item : { imgSrc: null };
    }

    get itemSize() {
        return this.size ?
            {
                width: UIUtils.getCssLikePx(this.size.width),
                height: UIUtils.getCssLikePx(this.size.height)
            }
            : null;
    }
}