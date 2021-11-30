import { Directive, TemplateRef, ViewContainerRef, Input, OnInit, OnDestroy } from "@angular/core";
import { CollectionUtils } from "../../common/utils/collection-utils";
import { SfcModalService } from "../modal-service/sfc-modal.service";

@Directive({
    selector: '[modal-open-on-click]'
})
export class SfcModalOpenOnClickDirective implements OnInit, OnDestroy {

    @Input('modal-open-on-click')
    set modalOpenOnClick(elements: any) {
        if (!elements)
            return;

        // if(CollectionUtils.any(this.elements)){
        //     this.elements.forEach(el => {
        //         el.removeEventListener('click', this.clickHandler);
        //     })
        // }

        if (elements.length)
            this.elements = elements;
        else
            this.elements = [elements];

        this.elements.forEach(el => {
            el.addEventListener('click', this.clickHandler);
        });
    }

    private elements: HTMLBaseElement[];

    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private modalService: SfcModalService) {
    }

    ngOnInit(): void {
        this.modalService.close$.subscribe(() => {
            this.viewContainer.clear();
        });
    }

    ngOnDestroy(): void {
        this.elements.forEach(el => {
            el.removeEventListener('click', this.clickHandler);
        })
    }

    private clickHandler = ((args:PointerEvent) => {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.modalService.open(args.currentTarget);
    }).bind(this);
}