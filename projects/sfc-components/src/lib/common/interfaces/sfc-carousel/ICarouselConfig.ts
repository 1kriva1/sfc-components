import { Type } from "@angular/core";
import { ComponentMovementType, ComponentSize, PositionType } from "../../constants/common-constants";

export default interface ICarouselConfig {
    items: any[];
    itemType: Type<any>;
    positionType?: PositionType;
    movementType?: ComponentMovementType;
    size?: ComponentSize;
}