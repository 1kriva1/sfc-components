import {
  Component,
  Input,
  ContentChild,
  forwardRef,
} from "@angular/core";
import { SfcTabBodyComponent } from "./sfc-tab-body.component";
import { SfcTabLabelComponent } from "./sfc-tab-label.component";

@Component({
  selector: "sfc-tab-item",
  template: "<ng-content></ng-content>",
})
export class SfcTabItemComponent {
  @Input()
  label: string;

  @Input()
  selected: boolean;

  @Input()
  disabled: boolean;

  @ContentChild(forwardRef(() => SfcTabBodyComponent), { static: false })
  bodyComponent: SfcTabBodyComponent;

  @ContentChild(forwardRef(() => SfcTabLabelComponent), { static: false })
  labelComponent: SfcTabLabelComponent;
}
