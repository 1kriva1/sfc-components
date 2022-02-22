import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {  ISelectionEvent } from '../../../common/interfaces/sfc-table/ISelectionEvent';

@Injectable({
  providedIn: 'root'
})
export class TableSelectedService {

  private selectedSubject = new Subject<ISelectionEvent>();

  public selectedAction$: Observable<ISelectionEvent> = this.selectedSubject.asObservable();

  public selectAllRows(isAllSelected: boolean) {
    this.selectedSubject.next({ rowIndex: null, selected: isAllSelected });
  }

  public selectRow(rowIndex: number, selected: boolean) {
    this.selectedSubject.next({ rowIndex: rowIndex, selected: selected });
  }
}