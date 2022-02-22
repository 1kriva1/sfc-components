import { Inject, Injectable } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { map, shareReplay, startWith, tap } from 'rxjs/operators';
import { CommonConstants } from '../../../common/constants/common-constants';
import { ResizeService } from '../../../common/services/resize.service';
import { WINDOW } from '../../../common/services/window-ref.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnsToggleService {

  // current state of toggle 
  private showColumns: boolean = false;

  private toggleSubject = new Subject<void>();

  // toggle state observable
  private toggleColumns$ = this.toggleSubject.asObservable()
    .pipe(
      tap(() => this.showColumns = !this.showColumns),
      shareReplay()
    );

  // show column observable 
  public showColumns$: Observable<boolean> = merge(
    this.resizeService.onResize$.pipe(startWith(null)),
    this.toggleColumns$
  ).pipe(
    map(() => this.window.innerWidth >= CommonConstants.MEDIA_LIMITS.TABLET_MAX_SIZE ? true : this.showColumns)
  );

  constructor(@Inject(WINDOW) private window: Window, private resizeService: ResizeService) { }

  public toggleColumns() {
    this.toggleSubject.next();
  }
}