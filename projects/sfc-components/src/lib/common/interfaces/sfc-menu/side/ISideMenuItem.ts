import { SideMenuType } from "../../../constants/common-constants";
import IMenuItem from "../IMenuItem";

export default interface ISideMenuItem extends IMenuItem {
    type: SideMenuType;
    items?: ISideMenuItem[]
}