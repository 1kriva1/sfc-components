import { SortingDirection } from "../../constants/common-constants";

export default interface ISortingEvent {
    sortingId: string;
    direction: SortingDirection;
}