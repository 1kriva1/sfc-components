import { ElementRef, Input, ViewChild } from "@angular/core";
import { ComponentSize } from "../../../common/constants/common-constants";
import ISize from "../../../common/interfaces/ISize";
import { CommonUtils } from "../../../common/utils/common-utils";
import { SfcCarouselItem } from "./sfc-carousel-item";

export default abstract class SfcCarouselItemBaseComponent extends SfcCarouselItem {

    @Input()
    size: ComponentSize;

    @ViewChild('itemEl', { static: false, read: ElementRef })
    itemEl: ElementRef;

    get itemSize(): ISize {
        const elSize = (<HTMLElement>this.itemEl.nativeElement).getBoundingClientRect();

        return {
            width: this.index == this.currentIndex ? elSize.width : elSize.width / 0.7,
            height: this.index == this.currentIndex ? elSize.height : elSize.height / 0.7
        };
    }

    getDataValue<T>(item: T, key: string) {
        return CommonUtils.isDefined(item) ? item[key] : null;
    }
}