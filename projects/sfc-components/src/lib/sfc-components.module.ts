import { NgModule, ModuleWithProviders } from '@angular/core';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { SfcTabPanelComponent } from './sfc-tabs/sfc-tab-panel.component';
import { SfcModalComponent } from './sfc-modal/sfc-modal.component';
import { ButtonComponent } from './sfc-button/sfc-button.component';
import { SfcModalOpenOnClickDirective } from './sfc-modal/open-on-click-directive/sfc-modal-open-on-click.directive';
import { SfcDefaultModalHeaderComponent } from './sfc-modal/defaults/header/sfc-default-modal-header.component';
import { SfcModalService } from './sfc-modal/modal-service/sfc-modal.service';
import { SfcDefaultModalFooterComponent } from './sfc-modal/defaults/footer/sfc-default-modal-footer.component';
import { SfcLineTabComponent } from './sfc-tabs/sfc-tab/sfc-line-tab/sfc-line-tab.component';
import { SfcIconTabComponent } from './sfc-tabs/sfc-tab/sfc-icon-tab/sfc-icon-tab.component';
import { SfcLineTabSliderComponent } from './sfc-tabs/sfc-tab/sfc-line-tab/slider/sfc-line-tab-slider.component';
import { SfcIconTabSliderComponent } from './sfc-tabs/sfc-tab/sfc-icon-tab/slider/sfc-icon-tab-slider.component';
import { SfcTabBodyComponent } from './sfc-tabs/tabs-base/sfc-tab-body.component';
import { SfcTabLabelComponent } from './sfc-tabs/tabs-base/sfc-tab-label.component';
import { SfcTabItemComponent } from './sfc-tabs/tabs-base/sfc-tab-item.component';
import { SfcSideMenuComponent } from './sfc-menu/side/sfc-side-menu.component';
import { SfcHamburgerComponent } from './common/components/hamburger/sfc-hamburger.component';
import { SfcSideMenuItemComponent } from './sfc-menu/side/side-menu-item/sfc-side-menu-item.component';
import { SfcSideMenuHeaderComponent } from './sfc-menu/side/side-menu-header/sfc-side-menu-header.component';
import { SfcSideMenuTitleComponent } from './sfc-menu/side/side-menu-title/sfc-side-menu-title.component';
import { SfcSideMenuItemSubComponent } from './sfc-menu/side/side-menu-item-sub/sfc-side-menu-item-sub.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SfcNavigationMenuComponent } from './sfc-menu/navigation/sfc-navigation-menu.component';
import { SfcNavigationMenuItemComponent } from './sfc-menu/navigation/navigation-menu-item/sfc-navigation-menu-item.component';
import { SfcAvatarComponent } from './sfc-avatar/sfc-avatar.component';
import { SfcProgressCircleComponent } from './sfc-progress/circle/sfc-progress-circle.component';
import { SfcAvatarBadgeComponent } from './sfc-avatar/sfc-avatar-badge/sfc-avatar-badge.component';
import { SfcStarsComponent } from './sfc-stars/sfc-stars.component';
import { SfcProgressLineComponent } from './sfc-progress/line/sfc-progress-line.component';
import { SfcProgressSemiCircleComponent } from './sfc-progress/semi-circle/sfc-progress-semi-circle.component';
import { SfcTagComponent } from './sfc-tags/tag/sfc-tag.component';
import { SfcTagsComponent } from './sfc-tags/sfc-tags.component';
import { SfcDropdownMenuComponent } from './sfc-menu/dropdown/sfc-dropdown-menu.component';
import { SfcDottedComponent } from './common/components/dotted/sfc-dotted.component';
import { SfcDropdownMenuItemComponent } from './sfc-menu/dropdown/dropdown-menu-item/sfc-dropdown-menu-item.component';
import { SfcDelimeterComponent } from './common/components/delimeter/sfc-delimeter.component';
import { SfcCarouselItemAvatarComponent } from './sfc-carousel/carousel-items/avatars/sfc-carousel-item-avatar.component';
import { SfcCarouselItemDefaultComponent } from './sfc-carousel/carousel-items/default/sfc-carousel-item-default.component';
import SfcCarouselItemComponent from './sfc-carousel/carousel-items/sfc-carousel-item.component';
import { SfcSliderComponent } from './sfc-slider/sfc-slider.component';
import { SfcSliderItemComponent } from './sfc-slider/slider-item/sfc-slider-item.component';
import { SfcNotificationComponent } from './sfc-notification/sfc-notification.component';
import { SfcNotificationContentComponent } from './sfc-notification/content/sfc-notification-content.component';
import { SfcAlertComponent } from './common/components/alert/sfc-alert.component';
import { SfcTimeLineComponent } from './sfc-timeline/sfc-timeline.component';
import { SfcTimeLineItemComponent } from './sfc-timeline/line-item/sfc-timeline-item.component';
import { SfcChartComponent } from './sfc-chart/sfc-chart.component';
import { SfcSchemeComponent } from './sfc-scheme/sfc-scheme.component';
import { StageComponent } from './sfc-carousel/sfc-owl-carousel/stage/sfc-owl-carousel-stage.component';
import { SfcOwlCarouselComponent } from './sfc-carousel/sfc-owl-carousel/sfc-owl-carousel.component';
import { ResizeService } from './common/services/resize.service';
import { WINDOW_PROVIDERS } from './common/services/window-ref.service';
import { DOCUMENT_PROVIDERS } from './common/services/document-ref.service';
import { SfcCarouselComponent } from './sfc-carousel/sfc-common-carousel/sfc-carousel.component';
import { SfcSchemeCarouselItemComponent } from './sfc-scheme/sfc-scheme-carousel-item/sfc-scheme-carousel-item.component';
import { SfcCarouselSlideDirective } from './sfc-carousel/sfc-owl-carousel/slide/sfc-carousel-slide.directive';
import { SfcSchemeCarouselDotComponent } from './sfc-scheme/sfc-scheme-carousel-item/sfc-scheme-dot/sfc-scheme-carousel-dot.component';
import { SfcSchemeCarouselFormationPipePipe } from './sfc-scheme/sfc-scheme-carousel-item/sfc-scheme-carousel-formation-pipe/sfc-scheme-carousel-formation-pipe.pipe';
import { SfcSchemePlayerPointComponent } from './sfc-scheme/sfc-scheme-player/sfc-scheme-player-point/sfc-scheme-player-point.component';
import { SfcSchemeModalBodyComponent } from './sfc-scheme/sfc-scheme-modal/sfc-scheme-modal-body/sfc-scheme-modal-body.component';
import { SfcSchemePlayerBadgeComponent } from './sfc-scheme/sfc-scheme-player/sfc-scheme-player-badge/sfc-scheme-player-badge.component';

import { SfcSchemePlayerComponent } from './sfc-scheme/sfc-scheme-player/sfc-scheme-player/sfc-scheme-player.component';
import { AdHostDirective } from './common/directives/ad-host/ad-host.directive';
import { ThrowElementOnHoverDirective } from './common/directives/throw-element/throw-element-on-hover.directive';
import { ShowHideElementDirective } from './common/directives/show-hide-element/show-hide-element.directive';


@NgModule({
  declarations: [
    ButtonComponent,
    SfcLineTabComponent,
    SfcLineTabSliderComponent,
    SfcIconTabComponent,
    SfcIconTabSliderComponent,
    SfcTabItemComponent,
    SfcTabLabelComponent,
    SfcTabBodyComponent,
    SfcTabPanelComponent,
    SfcModalComponent,
    SfcModalOpenOnClickDirective,
    SfcDefaultModalHeaderComponent,
    SfcDefaultModalFooterComponent,
    SfcSideMenuComponent,
    SfcHamburgerComponent,
    SfcDottedComponent,
    SfcSideMenuItemComponent,
    SfcSideMenuHeaderComponent,
    SfcSideMenuTitleComponent,
    SfcSideMenuItemSubComponent,
    SfcNavigationMenuComponent,
    SfcNavigationMenuItemComponent,
    SfcAvatarComponent,
    SfcProgressCircleComponent,
    SfcProgressSemiCircleComponent,
    SfcProgressLineComponent,
    SfcAvatarBadgeComponent,
    SfcStarsComponent,
    SfcTagsComponent,
    SfcTagComponent,
    SfcDropdownMenuComponent,
    SfcDropdownMenuItemComponent,
    SfcDelimeterComponent,
    SfcCarouselComponent,
    SfcCarouselItemDefaultComponent,
    SfcCarouselItemAvatarComponent,
    SfcCarouselItemComponent,
    SfcSliderComponent,
    SfcSliderItemComponent,
    SfcNotificationComponent,
    SfcNotificationContentComponent,
    SfcAlertComponent,
    SfcTimeLineComponent,
    SfcTimeLineItemComponent,
    SfcChartComponent,
    SfcSchemeComponent,
    SfcOwlCarouselComponent, 
    SfcCarouselSlideDirective, 
    StageComponent, 
    SfcSchemeCarouselItemComponent, 
    SfcSchemeCarouselDotComponent, SfcSchemeCarouselFormationPipePipe, SfcSchemePlayerPointComponent, SfcSchemeModalBodyComponent, SfcSchemePlayerBadgeComponent, 
    AdHostDirective, SfcSchemePlayerComponent, ThrowElementOnHoverDirective, ShowHideElementDirective
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ChartsModule
  ],
  exports: [ButtonComponent, SfcLineTabComponent, SfcIconTabComponent, SfcTabItemComponent,
    SfcTabLabelComponent,
    SfcTabBodyComponent, SfcTabPanelComponent, SfcModalComponent, SfcModalOpenOnClickDirective,
    SfcSideMenuComponent,
    SfcHamburgerComponent,
    SfcDottedComponent,
    SfcNavigationMenuComponent,
    SfcAvatarComponent,
    SfcStarsComponent,
    SfcProgressLineComponent,
    SfcProgressCircleComponent,
    SfcProgressSemiCircleComponent,
    SfcTagsComponent,
    SfcDropdownMenuComponent,
    SfcDelimeterComponent,
    SfcCarouselComponent,
    SfcCarouselItemDefaultComponent,
    SfcCarouselItemAvatarComponent,
    SfcCarouselItemComponent,
    SfcSliderComponent,
    SfcNotificationComponent,
    SfcNotificationContentComponent,
    SfcAlertComponent,
    SfcTimeLineComponent,
    SfcTimeLineItemComponent,
    SfcChartComponent,
    SfcSchemeComponent,
    SfcOwlCarouselComponent, 
    SfcCarouselSlideDirective,
    SfcSchemeCarouselItemComponent
  ],
  entryComponents: [SfcCarouselItemDefaultComponent, SfcCarouselItemAvatarComponent]
})
export class SfcComponentsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SfcComponentsModule,
      providers: [SfcModalService, ThemeService, ResizeService, WINDOW_PROVIDERS, DOCUMENT_PROVIDERS]
    }
  }
}
