import { SortingDirection } from "../../constants/common-constants";
import { ISortingIcon } from "./ISortingIcon";

export default interface ISortingConfig {
    enabled:boolean;
    active:boolean;
    direction?: SortingDirection;
    icons?: ISortingIcon[];
}