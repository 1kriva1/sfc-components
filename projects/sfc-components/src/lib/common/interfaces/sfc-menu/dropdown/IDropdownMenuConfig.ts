import { DropdownMenuPosition } from "../../../constants/common-constants";
import IDropdownMenuItem from "./IDropdownMenuItem";

export default interface IDropdownMenuConfig {
    items: IDropdownMenuItem[];
    clickOutside?: boolean;
    hideOnClick?: boolean;
    bordered?: boolean;
    position?: string;
    icon?:string;
    label?:string;
}