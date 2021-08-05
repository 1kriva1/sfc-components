import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { DropdownMenuPosition, StyleClass } from '../../common/constants/common-constants';
import IDropdownMenuConfig from '../../common/interfaces/sfc-menu/dropdown/IDropdownMenuConfig';
import IDropdownMenuItem from '../../common/interfaces/sfc-menu/dropdown/IDropdownMenuItem';
import { CommonUtils } from '../../common/utils/common-utils';

@Component({
    selector: 'sfc-dropdown-menu',
    templateUrl: './sfc-dropdown-menu.component.html',
    styleUrls: ['./sfc-dropdown-menu.component.css', './sfc-dropdown-menu-dark-theme.component.css']
})
export class SfcDropdownMenuComponent implements OnInit {

    @Input()
    config: IDropdownMenuConfig;

    @Output('on-select')
    onSelect: EventEmitter<IDropdownMenuItem> = new EventEmitter<IDropdownMenuItem>();

    @HostBinding('class.' + StyleClass.Active)
    active: boolean = false;

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (this.config.clickOutside && this.active && !this.eRef.nativeElement.contains(event.target)) {
            this.active = false;
        }
    }

    constructor(private eRef: ElementRef) { }

    ngOnInit(): void {
        this.config = CommonUtils.isDefined(this.config) ? this.config : { items: [], clickOutside: true };
    }

    get position() {
        return CommonUtils.isNullOrEmptyString(this.config.position)
            ? DropdownMenuPosition.Left
            : this.config.position;
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

    onToggleClick() {
        this.active = !this.active;
    }

    onClick(item: IDropdownMenuItem) {
        if (this.config.hideOnClick)
            this.active = false;

        if (this.onSelect)
            this.onSelect.emit(item);
    }
}