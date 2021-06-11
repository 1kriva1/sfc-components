import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { CommonConstants, StyleClass } from '../../../common/constants/common-constants';
import { CommonUtils } from '../../../common/utils/common-utils';

@Component({
    selector: 'sfc-side-menu-header',
    templateUrl: './sfc-side-menu-header.component.html',
    styleUrls: ['./sfc-side-menu-header.component.css', './sfc-side-menu-header-dark-theme.component.css']
})
export class SfcSideMenuHeaderComponent implements OnInit {    
    
    @Input()
    label: string;
    
    @Input('open')
    @HostBinding('class.' + StyleClass.Open)
    isOpen: boolean;

    @Output('on-toggle')
    onToggle: EventEmitter<void> = new EventEmitter<void>();

    ngOnInit(): void {
        this.label = CommonUtils.isNullOrEmptyString(this.label) ? CommonConstants.DEFAULT_MENU_HEADER_TEXT : this.label;
    }

    onClick() {
        if(this.onToggle)
            this.onToggle.emit();
    }
}