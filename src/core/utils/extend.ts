import { isArray, isFunction, isPlainObject, isNull } from 'core/utils/types';
import { each } from 'core/utils/arrays';

// https://github.com/jquery/jquery/blob/master/src/core.js#L116
export function extend<T, U>(target: T, object1: U): T & U;
export function extend<T, U, V>(target: T, object1: U, object2: V): T & U & V;
export function extend<T, U, V, W>(target: T, object1: U, object2: V, object3: W): T & U & V & W;
export function extend<T, U, V, W, X>(target: T, object1: U, object2: V, object3: W, object4: X): T & U & V & W & X;
export function extend<T, U, V, W, X, Y>(target: T, object1: U, object2: V, object3: W, object4: X, object5: Y): T & U & V & W & X & Y;
export function extend<T, U, V, W, X, Y, Z>(target: T, object1?: U, object2?: V, object3?: W, object4?: X, object5?: Y, object6?: Z): T & U & V & W & X & Y & Z {
    const sources: Array<any> = [object1, object2, object3, object4, object5, object6];

    // Handle case when target is a string or something (possible in deep copy)
    if ((typeof target !== "object" || isNull(target)) && !isFunction(target)) {
        target = {} as T;
    }

    each(sources, (source) => {
        // Only deal with non-null/undefined values
        if (source != null) {

            // Extend the base object
            for (const name in source) {
                const copy: any = source[name];

                // Prevent Object.prototype pollution
                // Prevent never-ending loop
                if (name === "__proto__" || target === copy) {
                    continue;
                }

                const copyIsArray = isArray(copy);

                // Recurse if we're merging plain objects or arrays
                if (copy && (isPlainObject(copy) || copyIsArray)) {
                    const src = target[name];
                    let clone: any = src;

                    // Ensure proper type for the source value
                    if (copyIsArray && !isArray(src)) {
                        clone = [];
                    } else if (!copyIsArray && !isPlainObject(src)) {
                        clone = {};
                    }

                    // Never move original objects, clone them
                    target[name] = extend(clone, copy) as any;

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    });

    // Return the modified object
    return target as any;
}