import { TimeLinePosition } from "../../constants/common-constants";

export default interface ITimeLineItem {
    title: string;
    position: TimeLinePosition;
    dateTimeLabel: string;
    description?: string;
    isPeriod?: boolean;    
    icon?: string;
    imgSrc?: string;
}