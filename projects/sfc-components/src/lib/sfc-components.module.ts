import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfcTabComponent } from './sfc-tab/sfc-tab.component';
import { SfcTabPanelComponent } from './sfc-tab/sfc-tab-panel.component';
import { SfcModalComponent } from './sfc-modal/sfc-modal.component';
import { SfcModalOpenOnClickDirective } from './sfc-modal/sfc-modal-open-on-click.directive';
import { SfcModalService } from './sfc-modal/sfc-modal.service';

@NgModule({
  declarations: [SfcTabComponent, SfcTabPanelComponent, SfcModalComponent, SfcModalOpenOnClickDirective],
  imports: [
    CommonModule
  ],
  exports: [SfcTabComponent, SfcTabPanelComponent, SfcModalComponent, SfcModalOpenOnClickDirective]
})
export class SfcComponentsModule { 

  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SfcComponentsModule,
      providers: [SfcModalService]
    }
  }

}
