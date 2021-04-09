import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfcTabComponent } from './sfc-tab/sfc-tab.component';
import { SfcTabPanelComponent } from './sfc-tab/sfc-tab-panel.component';
import { SfcModalComponent } from './sfc-modal/sfc-modal.component';
import { ButtonComponent } from './sfc-button/sfc-button.component';
import { SfcModalOpenOnClickDirective } from './sfc-modal/open-on-click-directive/sfc-modal-open-on-click.directive';
import { SfcDefaultModalHeaderComponent } from './sfc-modal/defaults/header/sfc-default-modal-header.component';
import { SfcModalService } from './sfc-modal/modal-service/sfc-modal.service';
import { SfcDefaultModalFooterComponent } from './sfc-modal/defaults/footer/sfc-default-modal-footer.component';

@NgModule({
  declarations: [ButtonComponent, 
    SfcTabComponent, 
    SfcTabPanelComponent, 
    SfcModalComponent, 
    SfcModalOpenOnClickDirective,
    SfcDefaultModalHeaderComponent,
    SfcDefaultModalFooterComponent],
  imports: [
    CommonModule
  ],
  exports: [ButtonComponent, SfcTabComponent, SfcTabPanelComponent, SfcModalComponent, SfcModalOpenOnClickDirective]
})
export class SfcComponentsModule { 

  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SfcComponentsModule,
      providers: [SfcModalService]
    }
  }

}
