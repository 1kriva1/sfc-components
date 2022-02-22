export interface IToggleConfigItem {
    label: string;
    icon?: string;
}

export interface IToggleConfig {
    checkedItem: IToggleConfigItem;
    uncheckedItem: IToggleConfigItem;
}