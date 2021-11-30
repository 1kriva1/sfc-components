import { Injectable } from '@angular/core';
import { ISchemeModalData } from '../../../common/interfaces/sfc-scheme/ISchemeModalData';
import { ISchemePlayerData } from '../../../common/interfaces/sfc-scheme/ISchemePlayerData';

@Injectable({
  providedIn: 'root'
})
export class SfcSchemeModalService {

  public selectedData: ISchemePlayerData;

  public modalData: ISchemeModalData;
  
  constructor() { }
}
