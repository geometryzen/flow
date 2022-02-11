import { Match } from '../Match';
import { Session } from '../Session';

/**
 * Determines which match wins based upon the recency property of each Match.
 * @param a 
 * @param b 
 * @returns 
 */
export function factRecency<T, S extends Session<T>>(a: Match<T, S>, b: Match<T, S>): number {
    let i = 0;
    const aMatchRecency = a.match.recency;
    const bMatchRecency = b.match.recency;
    const aLength = aMatchRecency.length - 1;
    const bLength = bMatchRecency.length - 1;
    while (aMatchRecency[i] === bMatchRecency[i] && i < aLength && i < bLength && i++) {
        // Do nothing, just let i increment each pass.
    }
    let ret = aMatchRecency[i] - bMatchRecency[i];
    if (!ret) {
        ret = aLength - bLength;
    }
    return ret;
}
