import { Match } from '../Match';
import { Session } from '../Session';

/**
 * Determines which match wins based upon the counter property of the match.
 * @param a 
 * @param b 
 * @returns 
 */
export function bucketCounter<T, S extends Session<T>>(a: Match<T, S>, b: Match<T, S>): number {
    return a.counter - b.counter;
}
