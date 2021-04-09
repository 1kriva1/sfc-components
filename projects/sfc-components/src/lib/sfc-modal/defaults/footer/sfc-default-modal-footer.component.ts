import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import IDefaultFooterConfig from '../../../common/interfaces/sfc-modal/IDefaultFooterConfig';
import { CommonUtils } from '../../../common/utils/common-utils';

@Component({
    selector: 'sfc-default-modal-footer',
    templateUrl: './sfc-default-modal-footer.component.html',
    styleUrls: ['./sfc-default-modal-footer.component.css', './sfc-default-modal-footer-dark-theme.component.css']
})
export class SfcDefaultModalFooterComponent implements OnInit {

    @Input()
    config: IDefaultFooterConfig;

    @Output()
    closed: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    ok: EventEmitter<void> = new EventEmitter<void>();

    ngOnInit(): void {
        if (!CommonUtils.isDefined(this.config)) {
            this.config = { cancelButton: true, okButton: true };
        }
    }

    onCancel() {
        if (CommonUtils.isDefined(this.config.onCancel)) {
            this.config.onCancel();
        } else {
            this.closed.emit();
        }
    }

    onOk() {
        if (CommonUtils.isDefined(this.config.onOk)) {
            this.config.onOk();
        } else {
            this.ok.emit();
        }
    }
}