import { Component, HostBinding, Input } from '@angular/core';
import { PositionType, StyleClass } from '../../constants/common-constants';

@Component({
    selector: 'sfc-dotted',
    templateUrl: './sfc-dotted.component.html',
    styleUrls: ['./sfc-dotted.component.css', './sfc-dotted-dark-theme.component.css']
})
export class SfcDottedComponent {

    @Input()
    @HostBinding('class.' + StyleClass.Active)
    active: boolean = false;

    @Input()
    @HostBinding('class')
    position: PositionType = PositionType.Horizontal;

    @Input()
    @HostBinding('class.' + StyleClass.Animated)
    animated: boolean = true;
}