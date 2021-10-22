import IDefaultHeaderConfig from "../interfaces/sfc-modal/IDefaultHeaderConfig";

export class CommonConstants {
  static BUTTON_DEFAULT_TEXT = 'Button';
  static NOT_FOUND_INDEX = -1;
  static MIN_VALUE = 0;
  static FULL_PERCENTAGE = 100;
  static CSS_PIXELS = 'px';
  static CSS_PERCENTAGE = '%';
  static CSS_DEGREES = 'deg';
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
  static PROGRESS_DEFAULT_COLORS = {
    MIN_LOW: '#f08d97',
    LOW: '#ED5565',
    MAX_LOW: '#DA4453',
    MIN_MEDIUM: '#dfc47f',
    MEDIUM: '#FFCE54',
    MAX_MEDIUM: '#FCBB42',
    MIN_HIGH: '#b5dd88',
    HIGH: '#A0D468',
    MAX_HIGH: '#8CC152',
  };
  static CAROUSEL_DELAY_MS = 1000;
  static CAROUSEL_AUTOMATIC_PERIOD_MS = 1500;
  static CAROUSEL_DEFAULT_COUNT = 3
  static CAROUSEL_ITEM_DEFAULT_SIZE = 180;
  static COMPONENT_AUTOMATIC_PERIOD_MS = 3000;
  static NOTIFICATION_DESTROY_INTERVAL_MS = 5000;
}

export enum ComponentTheme {
  LIGHT = 'common',
  DARK = 'dark'
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
  Hided = 'hided',
  Animated = 'animated'
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

export enum DropdownMenuPosition {
  Left = 'left',
  Right = 'right',
  Top = 'top',
  Bottom = 'bottom',
  Center = 'center'
}

export enum PositionType {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

export enum ComponentMovementType {
  Custom = 'custom',
  Automatic = 'automatic'
}

export enum CarouselItemState {
  Center = 'center',
  Up = 'up',
  Down = 'down',
  ShowDown = 'show-down',
  ShowUp = 'show-up',
  HideDown = 'hide-down',
  HideUp = 'hide-up',
  Hide = 'hide'
}

export enum NotificationComponentType {
  Info = 'info',
  Success = 'success',
  Failed = 'failed'
}

export enum TimeLinePosition {
  Left = 'left',
  Right = 'right'
}
