import { Match } from './Match';
import { Session } from './Session';

/**
 * The prototype for a conflict resolution strategy.
 */
export interface ConflictResolutionStrategy<T, S extends Session<T>> {
    (a: Match<T, S>, b: Match<T, S>): number;
}
