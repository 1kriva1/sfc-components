import { TestBed } from '@angular/core/testing';
import { CommonConstants } from '../../../common/constants/common-constants';
import { ResizeService } from '../../../common/services/resize.service';
import { WINDOW } from '../../../common/services/window-ref.service';
import { ColumnsToggleService } from './columns-toggle.service';

describe('Service:  ColumnsToggle', () => {
  let service: ColumnsToggleService;
  let windowMock: any = <any>{};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResizeService,
        { provide: WINDOW, useFactory: (() => { return windowMock; }) }
      ]
    });
    service = TestBed.get(ColumnsToggleService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Show columns observable should be created', () => {
    expect(service.showColumns$).toBeDefined();
  });

  it('Show columns return default value when window innerWidth less than max value', (done: DoneFn) => {
    windowMock.innerWidth = CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE - 1;

    service.showColumns$.subscribe(value => {
      expect(value).toBeFalsy();
      done();
    });
  });

  it('Show columns return default value when window innerWidth equal than max value', (done: DoneFn) => {
    windowMock.innerWidth = CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE;
    
    service.showColumns$.subscribe(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('Show columns return default value when window innerWidth more than max value', (done: DoneFn) => {
    windowMock.innerWidth = CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE + 1;
    
    service.showColumns$.subscribe(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('Toggle event changing', (done: DoneFn) => {
    windowMock.innerWidth = CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE - 1;
    let isFirstCalled: boolean = false;
    
    service.showColumns$.subscribe(value => {
      expect(value).toEqual(isFirstCalled ? true: false);
      isFirstCalled = true;
      done();
    });

    service.toggleColumns();
  });
});