import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, Input, OnInit, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { fromEvent } from 'rxjs';
import { SchemePlayerPointType, SchemeType } from '../common/constants/common-constants';
import { OwlOptions } from '../common/interfaces/sfc-carousel/sfc-owl-carousel/owl-options.model';
import IDropdownMenuConfig from '../common/interfaces/sfc-menu/dropdown/IDropdownMenuConfig';
import IDropdownMenuItem from '../common/interfaces/sfc-menu/dropdown/IDropdownMenuItem';
import { ISchemeCarouselFormationConfig } from '../common/interfaces/sfc-scheme/ISchemeCarouselFormationConfig';
import { ISchemeFormationData } from '../common/interfaces/sfc-scheme/ISchemeFormationData';
import { ISchemeModalData } from '../common/interfaces/sfc-scheme/ISchemeModalData';
import { ISchemePlayerFormationConfig } from '../common/interfaces/sfc-scheme/ISchemePlayerFormationConfig';
import { ISchemePlayerFormationData } from '../common/interfaces/sfc-scheme/ISchemePlayerFormationData';
import ITagItem from '../common/interfaces/sfc-tags/ITagItem';
import { CollectionUtils } from '../common/utils/collection-utils';
import { CommonUtils } from '../common/utils/common-utils';
import { UIUtils } from '../common/utils/ui-utils';
import { SfcModalService } from '../sfc-modal/modal-service/sfc-modal.service';
import { SfcModalComponent } from '../sfc-modal/sfc-modal.component';
import { SfcSchemeCarouselItemComponent } from './sfc-scheme-carousel-item/sfc-scheme-carousel-item.component';
import { SfcSchemeModalService } from './sfc-scheme-modal/services/sfc-scheme-modal.service';
import { SfcSchemePlayerBadgeComponent } from './sfc-scheme-player/sfc-scheme-player-badge/sfc-scheme-player-badge.component';
import { SfcSchemePlayerPointComponent } from './sfc-scheme-player/sfc-scheme-player-point/sfc-scheme-player-point.component';
import { SfcSchemePlayerComponent } from './sfc-scheme-player/sfc-scheme-player/sfc-scheme-player.component';


@Component({
  selector: 'sfc-scheme',
  templateUrl: './sfc-scheme.component.html',
  styleUrls: ['./sfc-scheme.component.css', './sfc-scheme-dark-theme.component.css']
})
export class SfcSchemeComponent implements OnInit, AfterViewInit {

  @Input()
  formations: ISchemeFormationData[];

  @Input('formation-id')
  formationId: any;

  @Input('player-formations')
  playerFormations: ISchemePlayerFormationConfig[];

  @Input()
  type: SchemeType = SchemeType.Formation;

  imgSrc: string = 'http://localhost:4200/football_field_8.jpg';
  customOptions: OwlOptions = {
    autoWidth: true,
    loop: true,
    // items: '10',
    margin: 40,
    // slideBy: 'page',
    // merge: true,
    // autoplay: true,
    // autoplayTimeout: 5000,
    // autoplayHoverPause: true,
    // autoplaySpeed: 4000,
    dotsSpeed: 500,
    dots: false,
    // dotsData: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    smartSpeed: 400,
    // fluidSpeed: 499,
    dragEndSpeed: 350,
    // dotsEach: 4,
    center: true,
    // rewind: true,
    // rtl: true,
    //startPosition: 4,
    // navText: [ '<i class=fa-chevron-left>left</i>', '<i class=fa-chevron-right>right</i>' ],
    responsive: {
      0: {
        items: 1
      },
      50: {
        items: 2
      },
      100: {
        items: 3
      },
      150: {
        items: 4
      },
      200: {
        items: 5
      },
      // 500: {
      //     items: 6
      // }
    },
    // stagePadding: 40,
    nav: false
  }

  schemeActionsMenuConfig: IDropdownMenuConfig = {
    items: [
      {
        label: 'Formation',
        icon: 'fas fa-star',
        onClick: this.onFormationActionClick.bind(this)
      },
      {
        label: 'Arbitrarly',
        icon: 'fab fa-line',
        onClick: this.onArbitrarlyActionClick.bind(this)
      }
    ],
    clickOutside: true,
    bordered: false,
    hideOnClick: true,
    position: '',
    icon: '',
    label: ''
  }

  @ViewChildren(SfcSchemePlayerComponent, { read: ElementRef })
  points: QueryList<ElementRef>;

  @ViewChild(SfcModalComponent, { static: false })
  openModalHandler: SfcModalComponent;

  carouselFormations: ISchemeCarouselFormationConfig[];

  playerPoints: any;

  get modalTitleText(): string {
    let selectedPlayerData = this.schemeModalService.selectedData;
    return selectedPlayerData ? `${selectedPlayerData.firstName} ${selectedPlayerData.lastName}` : `Please select player`;
  }

  get selectedFormation(): number[] {
    let carouselFormation = CollectionUtils.getItem(this.carouselFormations, f => f.selected);
    return carouselFormation ? [...carouselFormation.formation, 1] : null
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private schemeModalService: SfcSchemeModalService) { }

  ngOnInit(): void {
    this.carouselFormations = this.formations.map(d => ({
      id: d.id,
      formation: d.formation,
      selected: d.id === this.formationId
    }));

    this.customOptions.startPosition = this.formationId;

    if (!CollectionUtils.any(this.playerFormations))
      this.playerFormations = this.setPlayerFormations();
  }

  ngAfterViewInit(): void {
    this.playerPoints = this.points.map(f => f.nativeElement);

    this.points.changes.subscribe((list: QueryList<ElementRef>) => {
      this.playerPoints = list.map(f => f.nativeElement);
    });
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  lineStyle(index: number) {
    return {
      height: UIUtils.getCssLikePercentage(100 / this.selectedFormation.length),
      top: UIUtils.getCssLikePercentage((100 / this.selectedFormation.length) * index)
    }
  }

  selectFormation(item: ISchemeFormationData) {
    this.carouselFormations.forEach(item => item.selected = false);

    let selectedFormation = CollectionUtils.getItem(this.carouselFormations, f => f.id === item.id);

    if (CommonUtils.isDefined(selectedFormation))
      selectedFormation.selected = true;

    this.playerFormations = this.setPlayerFormations();
  }

  onAddPlayer(line: number, index: number, value: ISchemePlayerFormationData) {
    this.schemeModalService.selectedData = value.data;
    this.schemeModalService.modalData = { line, index };
  }

  onModalOk() {
    let player = this.schemeModalService.selectedData;
    this.openModalHandler.close();

    let selectedPoint = this.playerFormations[this.schemeModalService.modalData.line][this.schemeModalService.modalData.index]

    selectedPoint.data = player;
  }

  onSelectSchemeType(item: IDropdownMenuItem) {

  }

  onFormationActionClick() {
    this.type = SchemeType.Formation;
  }

  onArbitrarlyActionClick() {
    this.type = SchemeType.Arbitrarily;
  }

  setPlayerFormations(): ISchemePlayerFormationConfig[] {
    if (this.selectedFormation) {
      let playerFormationsMapped: ISchemePlayerFormationConfig[] = [];
      this.selectedFormation.map(f => {
        let _array: ISchemePlayerFormationData[] = [];
        for (let index = 0; index < f; index++) {
          _array.push({ data: null });
        }
        playerFormationsMapped.push(_array);
      });

      return playerFormationsMapped;
    }
  }
}
