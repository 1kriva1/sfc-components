export class CommonConstants {
  static BUTTON_DEFAULT_TEXT = 'Button';
  static NOT_FOUND_INDEX = -1;
  static MIN_VALUE = 0;
  static FULL_PERCENTAGE = 100;
  static CSS_PIXELS = 'px';
  static CSS_PERCENTAGE = '%';
  static CSS_DEGREES = 'deg';
  static MEDIA_LIMITS = {
    TABLET_MAX_SIZE: 767,
    MOBILE_MAX_SIZE: 430
  }
  static DEFAULT_MODAL_HEADER_CONFIG = {
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
  static PAGINATION_DEFAULTS = {
    SIZE: 5,
    PAGE: 1,
    COUNT: 3
  };
  static TABLE_DEFAULTS = {
    PAGE_SIZE: 5,
    INITIAL_PAGE: 1,
    TEMPLATE: {
      COLUMN: 'column',
      ROW: 'row',
      CARD: 'card',
      ROW_CONTENT: 'row-content',
      ROW_EXPANDED_CONTENT: 'row-expanded-content'
    },
    COLUMNS_TOGGLE: {
      SHOW: {
        LABEL: 'Show',
        ICON: 'fa fa-eye'
      },
      HIDE: {
        LABEL: 'Hide',
        ICON: 'fa fa-eye-slash'
      }
    },
    DEFAULT_COLUMN_TEXT_SELECT_ALL: 'ALL'
  };
  static SHOW_HIDE_TRANSITION_DELAY = 0.5;
  static SORTING_DEFAULT_ICONS = {
    ASC_ICON: 'fa fa-chevron-up',
    DESC_ICON: 'fa fa-chevron-down',
  }
  static CHECKMARK_DEFAULTS = {
    ICON: 'fa fa-check'
  }
  static TOGGLE_DEFAULTS = {
    CHECKED_ITEM: { label: 'Checked' },
    UNCHECKED_ITEM: { label: 'Unchecked' }
  }
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
  Enabled = 'enabled',
  Selected = 'selected',
  Empty = 'empty',
  Focus = 'focus',
  Open = 'open',
  Loading = 'loading',
  Removed = 'removed',
  Hidden = 'hidden',
  Visible = 'visible',
  Animated = 'animated',
  Expanded = 'expanded'
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

export enum PositionSideType {
  Start = 'start',
  End = 'end',
  Center = 'center'
}

export enum TextStyle {
  UpperCase = 'uppercase',
  LowerCase = 'lowercase'
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

export enum SchemePlayerPointType {
  Point = 'point',
  Badge = 'badge'
}

export enum SchemeType {
  Formation = 'formation',
  Arbitrarily = 'arbitrarily'
}

export enum SortingDirection {
  Ascending = 'ascending',
  Descending = 'descending'
}

export enum TableColumnType {
  Data = 'data',
  Sequence = 'sequence',
  Selectable = 'selectable',
  Expanded = 'expanded'
}

export enum TableDataType {
  Rows = 'rows',
  Cards = 'cards'
}
