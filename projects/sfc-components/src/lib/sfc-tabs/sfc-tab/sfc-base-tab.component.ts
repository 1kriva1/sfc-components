import { EventEmitter, HostBinding, Input, OnInit, Output } from "@angular/core";
import { StyleClass } from "../../common/constants/common-constants";
import { CommonUtils } from "../../common/utils/common-utils";

export class BaseTabComponent implements OnInit {
    @Input()
    id: string;

    @Input()
    title: string;

    @Input()
    icon: string;

    @HostBinding('attr.' + StyleClass.Disabled)
    disabled: boolean;

    @HostBinding('attr.' + StyleClass.Selected)
    selected = false;

    @Output('on-select')
    onSelect: EventEmitter<string> = new EventEmitter<string>();

    ngOnInit(): void {
        this.title = CommonUtils.isNullOrEmptyString(this.title) ? this.id : this.title;
    }

    get iconClass() {
        const classes = {};

        if (this.icon) {
            // example: fa fa-star
            const iconParts = this.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        return classes;
    }

    selectValue() {
        if (this.onSelect) {
            this.onSelect.emit(this.id);
        }
    }
}