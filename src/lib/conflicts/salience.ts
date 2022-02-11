import { Match } from '../Match';
import { Session } from '../Session';

/**
 * The salience strategy looks at the rule priority.
 * @param a A match being compared to another.
 * @param b A match being compared to another.
 * @returns The priority of match a minus the priority of match b.
 */
export function salience<T, S extends Session<T>>(a: Match<T, S>, b: Match<T, S>): number {
    return a.rule.priority - b.rule.priority;
}
