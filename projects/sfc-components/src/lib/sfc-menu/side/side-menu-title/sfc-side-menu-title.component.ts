import { Component, HostBinding, Input } from '@angular/core';
import { StyleClass } from '../../../common/constants/common-constants';

@Component({
    selector: 'sfc-side-menu-title',
    templateUrl: './sfc-side-menu-title.component.html',
    styleUrls: ['./sfc-side-menu-title.component.css', './sfc-side-menu-title-dark-theme.component.css']
})
export class SfcSideMenuTitleComponent {

    @Input()
    label: string;

    @Input('open')
    @HostBinding('class.' + StyleClass.Open)
    isOpen: boolean;
}