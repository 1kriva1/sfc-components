import { ComponentSize } from "../../constants/common-constants";

export default interface ITagItem {
    label: string;
    icon?: string;
    size?: ComponentSize;
    customSize?: number;
}