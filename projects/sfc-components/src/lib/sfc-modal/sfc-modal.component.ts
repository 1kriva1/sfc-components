import { Component, HostBinding, Input, OnInit, TemplateRef, Injectable } from '@angular/core';
import { SfcModalService } from './sfc-modal.service';
import { EventManager } from '@angular/platform-browser';

@Component({
    selector: 'sfc-modal',
    templateUrl: './sfc-modal.component.html',
    styleUrls: ['./sfc-modal.component.css']
})
export class SfcModalComponent implements OnInit {

    @Input()
    body: TemplateRef<any>;

    @Input()
    hideOnEsc: boolean = true;

    @Input()
    hideOnClickOutside: boolean = true;

    @Input()
    context: any;

    constructor(private modalService: SfcModalService,
        private eventManager: EventManager) {
    }

    ngOnInit() {
        this.eventManager.addGlobalEventListener('window', 'keyup.esc', () => {
            if(this.hideOnEsc)
                this.close();
        })
    }

    close() {
        this.modalService.close();
    }

    onClickOutsideModal(){
        if(this.hideOnClickOutside)
            this.close();
    }

    cancelClick(evt: KeyboardEvent) {
        evt.stopPropagation();
        evt.preventDefault();
    }

}