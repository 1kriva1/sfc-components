import { Component, Input, OnInit } from '@angular/core';
import { ISchemeModalData } from '../../../common/interfaces/sfc-scheme/ISchemeModalData';
import { SfcSchemeModalService } from '../services/sfc-scheme-modal.service';

@Component({
  selector: 'sfc-scheme-modal-body',
  templateUrl: './sfc-scheme-modal-body.component.html',
  styleUrls: ['./sfc-scheme-modal-body.component.css']
})
export class SfcSchemeModalBodyComponent implements OnInit {

  constructor(protected schemeModalService: SfcSchemeModalService) { }

  ngOnInit() {
  }

  onChoosePlayer(playerId: number){
    this.schemeModalService.selectedData = {
      id: playerId,
      firstName: 'Andrii',
      lastName: 'Kryvoruk',
      raiting: 78      
    };
  }

  onClear(){
    this.schemeModalService.selectedData = null;
  }
}
