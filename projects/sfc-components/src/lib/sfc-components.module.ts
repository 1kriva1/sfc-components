import { NgModule, ModuleWithProviders } from '@angular/core';
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
    SfcStarsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  exports: [ButtonComponent, SfcLineTabComponent, SfcIconTabComponent, SfcTabItemComponent,
    SfcTabLabelComponent,
    SfcTabBodyComponent, SfcTabPanelComponent, SfcModalComponent, SfcModalOpenOnClickDirective,
    SfcSideMenuComponent,
    SfcHamburgerComponent,
    SfcNavigationMenuComponent,
    SfcAvatarComponent,
    SfcStarsComponent,
    SfcProgressLineComponent,
    SfcProgressCircleComponent,
    SfcProgressSemiCircleComponent
  ]
})
export class SfcComponentsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SfcComponentsModule,
      providers: [SfcModalService]
    }
  }
}
