import { Component } from '@angular/core';
import BaseTabComponent from '../sfc-base-tab.component';

@Component({
    selector: 'sfc-line-tab',
    templateUrl: './sfc-line-tab.component.html',
    styleUrls: ['./sfc-line-tab.component.css'],
    providers: [{ provide: BaseTabComponent, useExisting: SfcLineTabComponent }]
})
export class SfcLineTabComponent extends BaseTabComponent {

}