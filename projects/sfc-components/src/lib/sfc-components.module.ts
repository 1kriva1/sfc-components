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

@NgModule({
  declarations: [
    ButtonComponent,
    SfcLineTabComponent,
    SfcLineTabSliderComponent,
    SfcIconTabComponent,
    SfcIconTabSliderComponent,
    SfcTabPanelComponent,
    SfcModalComponent,
    SfcModalOpenOnClickDirective,
    SfcDefaultModalHeaderComponent,
    SfcDefaultModalFooterComponent],
  imports: [
    CommonModule
  ],
  exports: [ButtonComponent, SfcLineTabComponent, SfcIconTabComponent, SfcTabPanelComponent, SfcModalComponent, SfcModalOpenOnClickDirective]
})
export class SfcComponentsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SfcComponentsModule,
      providers: [SfcModalService]
    }
  }

}
