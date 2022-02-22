import { Component, Directive, HostBinding, Input, OnInit } from "@angular/core";
import { SideMenuType, StyleClass } from "../../../common/constants/common-constants";
import ISideMenuItem from "../../../common/interfaces/sfc-menu/side/ISideMenuItem";
import { CommonUtils } from "../../../common/utils/common-utils";

export class BaseSideMenuItem implements OnInit {
    @Input()
    item: ISideMenuItem;

    @Input('open')
    @HostBinding('class.' + StyleClass.Open)
    isOpen: boolean;

    get iconClass() {
        const classes = {};

        if (this.item && this.item.icon) {
            // example: fa fa-star
            const iconParts = this.item.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        return classes;
    }

    ngOnInit(): void {
        this.item = CommonUtils.isDefined(this.item) ? this.item : { id: null, type: SideMenuType.Item };
    }
}