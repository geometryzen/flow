import { ConflictResolutionStrategy } from '../ConflictResolutionStrategy';
import { Match } from '../Match';
import { Session } from '../Session';
import { activationRecency } from './activationRecency';
import { bucketCounter } from './bucketCounter';
import { factRecency } from './factRecency';
import { salience } from './salience';

/**
 * Creates a ConflictResolutionStrategy based upon the names of some standard strategies.
 * @param strategyNames The names of the strategies to be used.
 */
export function strategy<T, S extends Session<T>>(strategyNames: ('salience' | 'activationRecency' | 'bucketCounter' | 'factRecency')[]): (a: Match<T, S>, b: Match<T, S>) => number {
    const strategies: { [name: string]: ConflictResolutionStrategy<T, S> } = {
        salience: salience,
        bucketCounter: bucketCounter,
        factRecency: factRecency,
        activationRecency: activationRecency,
    };
    const strats = strategyNames.map(function (name) {
        return strategies[name];
    });
    const stratsLength = strats.length;

    return function (a: Match<T, S>, b: Match<T, S>) {
        let i = -1;
        let ret = 0;
        const equal = a === b || (a.name === b.name && a.hashCode === b.hashCode);
        if (!equal) {
            while (++i < stratsLength && !ret) {
                ret = strats[i](a, b);
            }
            ret = ret > 0 ? 1 : -1;
        }
        return ret;
    };
}
