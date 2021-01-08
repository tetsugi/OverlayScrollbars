import { OSTargetObject } from 'typings';
import { Lifecycle } from 'lifecycles/lifecycleBase';
export declare type OverflowBehavior = 'hidden' | 'scroll' | 'visible-hidden' | 'visible-scroll';
export interface StructureLifecycleOptions {
    paddingAbsolute: boolean;
    overflowBehavior?: {
        x?: OverflowBehavior;
        y?: OverflowBehavior;
    };
}
export declare const createStructureLifecycle: (target: OSTargetObject, initialOptions?: StructureLifecycleOptions | undefined) => Lifecycle<StructureLifecycleOptions>;