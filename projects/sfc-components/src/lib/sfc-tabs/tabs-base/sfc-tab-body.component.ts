import { Component, TemplateRef, ViewChild } from "@angular/core";

@Component({
    selector: "sfc-tab-body",
    template: "<ng-template><ng-content></ng-content></ng-template>"
})
export class SfcTabBodyComponent {

    @ViewChild(TemplateRef, { static: false })
    bodyContent: TemplateRef<any>;
}
