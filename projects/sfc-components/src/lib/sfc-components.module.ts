import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfcTabComponent } from './sfc-tab/sfc-tab.component';
import { SfcTabPanelComponent } from './sfc-tab/sfc-tab-panel.component';



@NgModule({
  declarations: [SfcTabComponent, SfcTabPanelComponent],
  imports: [
    CommonModule
  ],
  exports: [SfcTabComponent, SfcTabPanelComponent]
})
export class SfcComponentsModule { }
