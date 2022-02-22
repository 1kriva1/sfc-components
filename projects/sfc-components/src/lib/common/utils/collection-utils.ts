import { Injectable } from '@angular/core';
import { CommonConstants, SortingDirection } from '../constants/common-constants';
import { CommonUtils } from './common-utils';

// @dynamic
@Injectable()
export class CollectionUtils {

    public static distinct<T>(collection: Array<T>): Array<T> {
        return this.any(collection) ? collection.filter((value, index, self) => self.indexOf(value) === index) : collection;
    }

    public static any<T>(collection: Array<T>, predicate: (item: T) => boolean = null): boolean {
        let isAny = CommonUtils.isDefined(collection) && collection.length > 0;

        if (isAny && predicate) {
            return collection.filter(predicate).length > 0;
        }

        return isAny;
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
            return Math.max(...collection.map(select));
        }

        return null;
    }

    public static sort<T>(collection: Array<T>, sortingId: string, sortingDirection: SortingDirection): Array<T> {
        if (CollectionUtils.any(collection)) {
            return sortingDirection == SortingDirection.Ascending
                ? collection.sort((a: T, b: T) => (a[sortingId] > b[sortingId] ? 1 : -1))
                : collection.sort((a: T, b: T) => (a[sortingId] > b[sortingId] ? -1 : 1))
        }

        return collection;
    }

    public static sortBy<T>(collection: Array<T>, propertyPath: string, sortingDirection: SortingDirection): Array<T> {
        if (CollectionUtils.any(collection)) {
            const propertyPaths = propertyPath.split('.');
            var pathsLength = propertyPaths.length;
            collection.sort((a: T, b: T) => {
                var i = 0;
                while (i < pathsLength) { a = a[propertyPaths[i]]; b = b[propertyPaths[i]]; i++; }

                return sortingDirection == SortingDirection.Ascending
                    ? a > b ? 1 : -1
                    : a > b ? -1 : 1;
            });

            return collection;
        }

        return collection;
    }

    public static all<T>(collection: Array<T>, predicate: (item: T) => boolean): boolean {
        if (CollectionUtils.any(collection)) {
            return collection.filter(predicate).length == collection.length;
        }

        return false;
    }

    public static remove<T>(collection: Array<T>, predicate: (item: T) => boolean): void {
        let foundItem: T = this.getItem(collection, predicate);
        if (foundItem != null) {
            const index = collection.indexOf(foundItem);
            if (index > -1) {
                collection.splice(index, 1);
            }
        }
    }

}