import { Input } from "@angular/core";
import { PositionType } from "../../../common/constants/common-constants";
import ICarouselItemState from "../../../common/interfaces/sfc-carousel/ICarouselItemState";

export default abstract class SfcCarouselItem {
    // item index
    @Input()
    index: number;

    @Input()
    currentIndex: number;

    @Input()
    previousIndex: number;

    // items count in carousel
    @Input()
    count: number;

    @Input()
    state: ICarouselItemState;

    @Input()
    type: PositionType;
}