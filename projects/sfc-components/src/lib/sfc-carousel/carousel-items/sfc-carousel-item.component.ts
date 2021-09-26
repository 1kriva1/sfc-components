import { Component, HostBinding, OnInit } from "@angular/core";
import { CarouselItemState, PositionType } from "../../common/constants/common-constants";
import { CommonUtils } from "../../common/utils/common-utils";
import SfcCarouselItem from "./base/sfc-carousel-item";

@Component({
    selector: 'sfc-carousel-item',
    templateUrl: './sfc-carousel-item.component.html',
    styleUrls: ['./sfc-carousel-item.component.css']
})
export default class SfcCarouselItemComponent extends SfcCarouselItem implements OnInit {

    ngOnInit(): void {
        this.type = this.type || PositionType.Horizontal;
        this.state = CommonUtils.isDefined(this.state) ? this.state : {};
    }

    @HostBinding('class')
    get itemClass() {
        let classValue = `${this.type} `;

        // if index equal to current index - mean center position
        if (this.index == this.currentIndex) {
            classValue += `${CarouselItemState.Center}`;
            return classValue;
        }

        // for newly created item animation
        if (this.state.created) {
            classValue += this.isMovedDown
                ? `${CarouselItemState.ShowDown}`
                : `${CarouselItemState.ShowUp}`;
            return classValue;
        }

        // for removing item animation
        if (this.state.removed) {
            classValue += this.isMovedDown
                ? `${CarouselItemState.HideDown}`
                : `${CarouselItemState.HideUp}`;
            return classValue;
        }

        const diff = this.currentIndex - this.index;

        // up position
        if (diff == 1 || (this.currentIndex + this.count) == this.index) {
            classValue += `${CarouselItemState.Up}`;
            return classValue;
        }

        // down position
        if (diff == -1 || ((this.index + this.count) == this.currentIndex)) {
            classValue += `${CarouselItemState.Down}`;
            return classValue;
        }

        // otherwise hide item
        classValue += `${CarouselItemState.Hide}`;

        return classValue;
    }

    get isMovedDown() {
        return (this.previousIndex > this.currentIndex && (this.previousIndex - this.count) != this.currentIndex)
            || (this.previousIndex + this.count) == this.currentIndex;
    }
}