import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonConstants } from '../../../common/constants/common-constants';
import IDefaultHeaderConfig from '../../../common/interfaces/sfc-modal/IDefaultHeaderConfig';
import { CommonUtils } from '../../../common/utils/common-utils';

@Component({
    selector: 'sfc-default-modal-header',
    templateUrl: './sfc-default-modal-header.component.html',
    styleUrls: ['./sfc-default-modal-header.component.css']
})
export class SfcDefaultModalHeaderComponent implements OnInit {

    @Input()
    config: IDefaultHeaderConfig;

    @Output()
    closed: EventEmitter<void> = new EventEmitter<void>();

    ngOnInit(): void {
        if (!CommonUtils.isDefined(this.config)) {
            this.config = CommonConstants.DEFAULT_MODAL_HEADER_CONFIG;
        }
    }

    get iconClass() {
        const classes = {};

        if (this.config.icon) {
            // example: fa fa-star
            const iconParts = this.config.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        return classes;
    }

    onClose() {
        this.closed.emit();
    }
}