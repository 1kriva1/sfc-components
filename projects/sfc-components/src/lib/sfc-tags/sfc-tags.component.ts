import { Component, Input, OnInit } from '@angular/core';
import ITagItem from '../common/interfaces/sfc-tags/ITagItem';
import { CommonUtils } from '../common/utils/common-utils';

@Component({
    selector: 'sfc-tags',
    templateUrl: './sfc-tags.component.html',
    styleUrls: ['./sfc-tags.component.css']
})
export class SfcTagsComponent implements OnInit {

    @Input()
    tags: ITagItem[];

    ngOnInit(): void {
        if (!CommonUtils.isDefined(this.tags))
            this.tags = [];
    }
}