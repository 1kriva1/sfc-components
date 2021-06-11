import ISideMenuItem from "./ISideMenuItem";

export default interface ISideMenuConfig {
    items: ISideMenuItem[];
    isOpen?: boolean;
}