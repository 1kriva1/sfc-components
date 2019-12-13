import { Directive, TemplateRef, ViewContainerRef, Input, ContentChild, AfterContentInit, OnInit, OnDestroy } from "@angular/core";
import { SfcModalComponent } from './sfc-modal.component';
import { SfcModalService } from './sfc-modal.service';

@Directive({
    selector: '[sfcModalOpenOnClick]'
})
export class SfcModalOpenOnClickDirective implements OnInit, OnDestroy {

    elements: HTMLBaseElement[];

    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private modalService: SfcModalService) {

    }

    @Input()
    set sfcModalOpenOnClick(els) {
        if (els.length)
            this.elements = els;
        else
            this.elements = [els];

        this.elements.forEach(el => {
            el.addEventListener('click', this.clickHandler);
        })
    }

    clickHandler = (() => {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
    }).bind(this);

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
}