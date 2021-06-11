import { Component, HostBinding, Input } from '@angular/core';
import { StyleClass } from '../../constants/common-constants';

@Component({
    selector: 'sfc-hamburger',
    templateUrl: './sfc-hamburger.component.html',
    styleUrls: ['./sfc-hamburger.component.css', './sfc-hamburger-dark-theme.component.css']
})
export class SfcHamburgerComponent {

    @Input('is-open')
    @HostBinding('class.' + StyleClass.Open)
    isOpen: boolean;
}