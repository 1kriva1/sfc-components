import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SfcModalService {

    private subject = new Subject();

    private subjectOpen = new Subject<any>();

    close$: Observable<any> = this.subject.asObservable();

    open$: Observable<any> = this.subjectOpen.asObservable();

    close() {
        this.subject.next();
    }

    open(options:any){
        this.subjectOpen.next(options);
    }
}