import { Type } from "@angular/core";
import { CarouselMovementType, ComponentSize, PositionType } from "../../constants/common-constants";

export default interface ICarouselConfig {
    items: any[];
    itemType: Type<any>;
    positionType?: PositionType;
    movementType?: CarouselMovementType;
    size?: ComponentSize;
}