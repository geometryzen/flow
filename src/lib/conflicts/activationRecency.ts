import { Match } from '../Match';
import { Session } from '../Session';

/**
 * Determines which match wins based upon the recency property of the Match.
 * @param a 
 * @param b 
 * @returns 
 */
export function activationRecency<T, S extends Session<T>>(a: Match<T, S>, b: Match<T, S>): number {
    return a.recency - b.recency;
}
