import { Component, ContentChild, forwardRef, TemplateRef, ViewChild } from "@angular/core";
import {BaseTabComponent} from "../sfc-tab/sfc-base-tab.component";


@Component({
  selector: "sfc-tab-label",
  template: "<ng-template><ng-content></ng-content></ng-template>",
})
export class SfcTabLabelComponent {

  @ViewChild(TemplateRef, { static: false })
  labelTemplate: TemplateRef<any>;

  @ContentChild(forwardRef(() => BaseTabComponent), { static: false })
  labelContent: BaseTabComponent;
}
