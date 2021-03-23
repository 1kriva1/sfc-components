import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfcTabComponent } from './sfc-tab/sfc-tab.component';
import { SfcTabPanelComponent } from './sfc-tab/sfc-tab-panel.component';
import { SfcModalComponent } from './sfc-modal/sfc-modal.component';
import { SfcModalOpenOnClickDirective } from './sfc-modal/sfc-modal-open-on-click.directive';
import { SfcModalService } from './sfc-modal/sfc-modal.service';
import { ButtonComponent } from './sfc-button/sfc-button.component';

@NgModule({
  declarations: [ButtonComponent, SfcTabComponent, SfcTabPanelComponent, SfcModalComponent, SfcModalOpenOnClickDirective],
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
