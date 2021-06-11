import { SideMenuType } from "../../../constants/common-constants";

export default interface ISideMenuItem {
    id:any;
    type: SideMenuType;
    label?:string;
    icon?:string;
    isActive?: boolean;
    items?: ISideMenuItem[]
}