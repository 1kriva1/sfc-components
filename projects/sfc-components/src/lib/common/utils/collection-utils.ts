import { Injectable } from '@angular/core';
import { CommonConstants } from '../constants/common-constants';
import { CommonUtils } from './common-utils';

// @dynamic
@Injectable()
export class CollectionUtils {

    public static distinct<T>(collection: Array<T>): Array<T> {
        return this.any(collection) ? collection.filter((value, index, self) => self.indexOf(value) === index) : collection;
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

    public static getItems<T>(collection: Array<T>, predicate: (item: T) => boolean): Array<T> {
        if (CollectionUtils.any(collection)) {
            let value = collection.filter(predicate);
            return value;
        }

        return null;
    }

    public static firstItem<T>(collection: Array<T>): T {
        if (CommonUtils.isDefined(collection) && collection.length > 0) {
            return collection[0];
        }

        return null;
    }

    public static lastItem<T>(collection: Array<T>): T {
        if (CommonUtils.isDefined(collection) && collection.length > 0) {
            return collection[collection.length - 1];
        }

        return null;
    }

    public static sum<T, P>(collection: Array<T>, select: (item: T) => number): number {
        if (CollectionUtils.any(collection)) {
            const arrayToSum = collection.map(select);
            return arrayToSum.reduce((a, b) => { return a + b }, 0)
        }

        return null;
    }

    public static max<T>(collection: Array<T>, select: (item: T) => number): number {
        if (CollectionUtils.any(collection)) {
            return Math.max( ...collection.map(select) );
        }

        return null;
    }

    
}