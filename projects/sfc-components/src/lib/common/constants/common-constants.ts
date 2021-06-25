import IDefaultHeaderConfig from "../interfaces/sfc-modal/IDefaultHeaderConfig";

export class CommonConstants {
    static BUTTON_DEFAULT_TEXT = 'Button';
    static NOT_FOUND_INDEX = -1;
    static CSS_PIXELS = 'px';
    static CSS_PERCENTAGE = '%';
    static DEFAULT_MODAL_HEADER_CONFIG: IDefaultHeaderConfig = {
        icon: 'fa fa-window-restore',
        showCloseIcon: true,
        text: 'Modal'
    }
    static TAB_DEFAULT_ICON = 'fa fa-star';
    static DEFAULT_MENU_HEADER_TEXT = 'Menu';
    static AVATAR_DEFAULTS = {
        AVATAR_PROGRESS_BAR_COLORS: {
            DEFAULT: '#CCD1D9',
            FILLED: '#2bbbad'
        },
        STROKE: 2,
        RADIUS: 80,
        PROGRESS: 0,
        AVATAR_IMAGE: '../../assets/defaultImage.png',
        INJURED_BADGE_BACKGROUND: '#ED5565',
        CAPTAIN_BADGE_BACKGROUND: '#6fa335'
    };
    static DEFAULT_STARS_COUNT = 5;
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

export enum TabType {
    Default = 'default',
    Line = 'line',
    Icon = 'icon'
};

export enum ComponentSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large'
};

export enum SideMenuType {
    Title = 'title',
    Item = 'item',
    Header = 'header',
    ItemWithSub = 'item-with-sub'
}

export enum StarTypes {
    None = 'none',
    S25 = 's25',
    S50 = 's50',
    S75 = 's75',
    Full = 'full'
}