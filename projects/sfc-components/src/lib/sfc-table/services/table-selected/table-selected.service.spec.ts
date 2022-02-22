import { TestBed } from '@angular/core/testing';
import { ISelectionEvent } from '../../../common/interfaces/sfc-table/ISelectionEvent';
import { TableSelectedService } from './table-selected.service';

describe('Service:  TableSelectedService', () => {
  let service: TableSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(TableSelectedService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Selected observable should be defined', () => {
    expect(service.selectedAction$).toBeDefined();
  });

  it('Should return event data', (done: DoneFn) => {
    service.selectedAction$.subscribe((event: ISelectionEvent) => {
      expect(event).toBeDefined();
      done();
    });

    service.selectRow(0, true);
  });

  it('Select row', (done: DoneFn) => {
    service.selectedAction$.subscribe((event: ISelectionEvent) => {
      expect(event.rowIndex).toEqual(11);
      expect(event.selected).toBeTruthy();
      done();
    });

    service.selectRow(11, true);
  });

  it('Unselect row', (done: DoneFn) => {
    service.selectedAction$.subscribe((event: ISelectionEvent) => {
      expect(event.rowIndex).toEqual(11);
      expect(event.selected).toBeFalsy();
      done();
    });

    service.selectRow(11, false);
  });

  it('Select all rows', (done: DoneFn) => {
    service.selectedAction$.subscribe((event: ISelectionEvent) => {
      expect(event.rowIndex).toBeNull();
      expect(event.selected).toBeTruthy();
      done();
    });

    service.selectAllRows(true);
  });

  it('Unselect all rows', (done: DoneFn) => {service.selectedAction$.subscribe((event: ISelectionEvent) => {
    expect(event.rowIndex).toBeNull();
    expect(event.selected).toBeFalsy();
      done();
    });

    service.selectAllRows(false);
  });
});