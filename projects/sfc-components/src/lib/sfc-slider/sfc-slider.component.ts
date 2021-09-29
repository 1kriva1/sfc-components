import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonConstants, ComponentMovementType } from '../common/constants/common-constants';
import ISliderConfig from '../common/interfaces/sfc-slider/ISliderConfig';
import { CommonUtils } from '../common/utils/common-utils';
import { UIUtils } from '../common/utils/ui-utils';
import { SfcSliderItemComponent } from './slider-item/sfc-slider-item.component';

@Component({
    selector: 'sfc-slider',
    templateUrl: './sfc-slider.component.html',
    styleUrls: ['./sfc-slider.component.css', './sfc-slider-dark-theme.component.css']
})
export class SfcSliderComponent implements OnInit, AfterViewChecked {

    @Input()
    config: ISliderConfig;

    @ViewChild('sliderContainer', { static: false })
    container: ElementRef;

    @ViewChildren(SfcSliderItemComponent)
    items: QueryList<SfcSliderItemComponent>;

    position: number = 0;

    autoSlider: any;

    active: boolean;

    pause: boolean;

    get sliderWidth() {
        if (this.container && this.items) {
            return UIUtils.getCssLikePx(this.container.nativeElement.offsetWidth * this.items.length);
        }
    }

    get leftPosition() {
        if (this.container) {
            return UIUtils.getCssLikePx(-this.container.nativeElement.offsetWidth * this.position);
        }
    }

    get count() {
        return this.items ? this.items.length : 0;
    }

    get isAutomaticMode() {
        return this.config.movementType == ComponentMovementType.Automatic;
    }

    get size() {
        return this.config.customSize ?
            {
                width: UIUtils.getCssLikePx(this.config.customSize.width),
                height: UIUtils.getCssLikePx(this.config.customSize.height)
            }
            : null;
    }

    constructor(private changeDetector: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.config = CommonUtils.isDefined(this.config) ? this.config : {
            items: [],
            movementType: ComponentMovementType.Custom,
            showCount: true,
            showPagination: true
        };

        // by default component is not moved automatically
        this.config.movementType = this.config.movementType || ComponentMovementType.Custom;

        this.startAutomaticMode();
    }

    ngAfterViewChecked() {
        this.changeDetector.detectChanges();
    }

    startAutomaticMode() {
        if (this.config.movementType == ComponentMovementType.Automatic)
            this.autoSlider = setInterval(() => this.slideRight(), CommonConstants.COMPONENT_AUTOMATIC_PERIOD_MS);
    }

    stopAutomaticMode() {
        if (this.config.movementType == ComponentMovementType.Automatic)
            clearInterval(this.autoSlider);
    }

    slideRight() {
        this.position++;
        if (this.position == this.count) { this.position = 0; }
    }

    slideLeft() {
        this.position--;
        if (this.position == -1) { this.position = this.count - 1; }
    }

    chooseItem(index: number) {
        this.position = index;
    }

    onMouseOver() {
        this.active = true;
        this.stopAutomaticMode();
    }

    onMouseOut() {
        this.active = false;
        if (!this.pause)
            this.startAutomaticMode();
    }

    toggleAutomaticMode() {
        this.pause = !this.pause;

        if (this.pause)
            this.stopAutomaticMode();
        else
            this.startAutomaticMode();
    }
}