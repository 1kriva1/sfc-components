import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SfcModalService {

    private subject = new Subject();

    close$: Observable<any> = this.subject.asObservable();

    close() {
        this.subject.next();
    }
}