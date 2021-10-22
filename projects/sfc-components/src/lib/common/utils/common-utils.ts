import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// @dynamic
@Injectable()
export class CommonUtils {

  public static isDefined<T>(value: T | undefined | null): value is T {
    return <T>value !== undefined && <T>value !== null;
  }

  public static isNullOrEmptyString<T>(value: string | undefined | null) {
    return !CommonUtils.isDefined(value) || value === '';
  }

  /**
* Simple object check.
* @param item
* @returns {boolean}
*/
  public static isObject(item): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

  /**
   * Deep merge two objects.
   * @param target
   * @param ...sources
   */
  public static mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return this.mergeDeep(target, ...sources);
  }
}
