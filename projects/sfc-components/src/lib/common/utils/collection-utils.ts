import { Injectable } from '@angular/core';
import { CommonConstants } from '../constants/common-constants';
import { CommonUtils } from './common-utils';

// @dynamic
@Injectable()
export class CollectionUtils {

    public static distinct<T>(collection: Array<T>): Array<T> {
        return this.any(collection) ? collection.filter((value, index, self)=>self.indexOf(value) === index) : collection;
    }

    public static any<T>(collection: Array<T>): boolean {
        return CommonUtils.isDefined(collection) && collection.length > 0;
    }

    public static getItem<T>(collection: Array<T>, predicate: (item: T) => boolean): T {
        if (CollectionUtils.any(collection)) {
            let value = collection.find(predicate);
            return value;
        }

        return null;
    }
}