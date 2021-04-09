import IDefaultHeaderConfig from "../interfaces/sfc-modal/IDefaultHeaderConfig";

export class CommonConstants {
    static BUTTON_DEFAULT_TEXT = 'Button';
    static NOT_FOUND_INDEX = -1;
    static CSS_PIXELS = 'px';
    static DEFAULT_MODAL_HEADER_CONFIG: IDefaultHeaderConfig = {
        icon: 'fa fa-window-restore',
        showCloseIcon: true,
        text: 'Modal'
    }
}

export enum StyleClass {
    Active = 'active',
    Valid = 'valid',
    Invalid = 'invalid',
    Disabled = 'disabled',
    Selected = 'selected',
    Empty = 'empty',
    Focus = 'focus',
    Open = 'open',
    Loading = 'loading',
    Removed = 'removed',
    Hided = 'hided'
};

export enum ButtonType {
    Bordered = 'bordered',
    Filled = 'filled',
    Rounded = 'rounded',
    Circled = 'circled',
    Texted = 'texted'
};

export enum ComponentSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large'
};