import { Component, HostBinding, Input, OnInit, TemplateRef, ViewChild, ElementRef, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { CommonUtils } from '../common/utils/common-utils';
import { StyleClass } from '../common/constants/common-constants';
import IDefaultHeaderConfig from '../common/interfaces/sfc-modal/IDefaultHeaderConfig';
import { SfcModalService } from './modal-service/sfc-modal.service';
import IDefaultFooterConfig from '../common/interfaces/sfc-modal/IDefaultFooterConfig';
import { CollectionUtils } from '../common/utils/collection-utils';

@Component({
    selector: 'sfc-modal',
    templateUrl: './sfc-modal.component.html',
    styleUrls: ['./sfc-modal.component.css']
})
export class SfcModalComponent implements OnInit, AfterContentChecked {
    
    // Template references 

    @Input()
    body: TemplateRef<any>;

    @Input()
    header: TemplateRef<any>;

    @Input()
    footer: TemplateRef<any>;

    // End Template references        

    // Defaults

    @Input('default-header')
    defaultHeader: boolean = true;

    @Input('default-footer')
    defaultFooter: boolean = true;

    @Input('default-header-config')
    defaultHeaderConfig: IDefaultHeaderConfig;

    @Input('default-footer-config')
    defaultFooterConfig: IDefaultFooterConfig;

    // End Defaults

    // Content templates

    @ViewChild('headerContent', { static: false })
    headerContent: ElementRef;

    @ViewChild('footerContent', { static: false })
    footerContent: ElementRef;

    // Content templates

    @Input('hide-on-esc')
    hideOnEsc: boolean = true;

    @Input('hide-on-click-outside')
    hideOnClickOutside: boolean = true;

    @Input()
    context: any;

    @HostBinding('class.' + StyleClass.Hidden)
    underHide: boolean = false;

    constructor(private modalService: SfcModalService,
        private eventManager: EventManager,
        private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.eventManager.addGlobalEventListener('window', 'keyup.esc', () => {
            if (this.hideOnEsc)
                this.close();
        })
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    get isShowDefaultHeader() {
        return !CommonUtils.isDefined(this.header)
            && (CommonUtils.isDefined(this.headerContent)
                && !CollectionUtils.any(this.headerContent.nativeElement.children))
            && this.defaultHeader;
    }

    get isShowDefaultFooter() {
        return !CommonUtils.isDefined(this.footer)
            && (CommonUtils.isDefined(this.footerContent)
                && !CollectionUtils.any(this.footerContent.nativeElement.children))
            && this.defaultFooter;
    }

    close() {
        if (!this.underHide) {
            this.underHide = true;
        }
    }

    onClickOutsideModal() {
        if (this.hideOnClickOutside)
            this.close();
    }

    cancelClick(evt: KeyboardEvent) {
        evt.stopPropagation();
        evt.preventDefault();
    }

    transitionEnd() {
        if (this.underHide) {
            this.modalService.close();
            this.underHide = false;
        }
    }
}