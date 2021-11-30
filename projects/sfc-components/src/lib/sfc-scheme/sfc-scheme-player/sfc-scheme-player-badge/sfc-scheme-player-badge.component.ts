import { Component, Input, OnInit } from '@angular/core';
import { ISchemePlayerData } from '../../../common/interfaces/sfc-scheme/ISchemePlayerData';
import { ISchemePlayerFormationConfig } from '../../../common/interfaces/sfc-scheme/ISchemePlayerFormationConfig';

@Component({
  selector: 'sfc-scheme-player-badge',
  templateUrl: './sfc-scheme-player-badge.component.html',
  styleUrls: ['./sfc-scheme-player-badge.component.css']
})
export class SfcSchemePlayerBadgeComponent implements OnInit {

  @Input()
  data: ISchemePlayerData;

  constructor() { }

  ngOnInit() {
  }

}
