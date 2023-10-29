/**
 * Hexashades - create an array of shades & tints for a given color.
 * @link https://github.com/arjunkdot/hexashades/
 * @license MIT
 */

declare module 'hexashades';

export declare class Colors {
    #private;
    result: string[];
    limit: number;
    constructor();
    createColors(color: string, percentage: number): string[];
}
