import { EventEmitter, HostBinding, Input, Output } from "@angular/core";
import { StyleClass } from "../../common/constants/common-constants";

export default abstract class BaseTabComponent {
    @Input()
    id: string;

    @Input()
    title: string;

    @Input()
    icon: string;

    @Input()
    @HostBinding('attr.' + StyleClass.Selected)
    selected = false;

    @Output('on-select')
    onSelect: EventEmitter<string> = new EventEmitter<string>();

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