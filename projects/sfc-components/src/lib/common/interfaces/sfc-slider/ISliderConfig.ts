import { ComponentMovementType } from "../../constants/common-constants";
import ISize from "../ISize";
import ISliderItemConfig from "./ISliderItemConfig";

export default interface ISliderConfig {
    items: ISliderItemConfig[];
    movementType?: ComponentMovementType;
    showCount?: boolean;
    showPagination?: boolean;
    customSize?: ISize;
}