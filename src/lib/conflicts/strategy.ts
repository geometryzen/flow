import { ConflictResolutionStrategy } from '../ConflictResolutionStrategy';
import { Match } from '../Match';
import { activationRecency } from './activationRecency';
import { bucketCounter } from './bucketCounter';
import { factRecency } from './factRecency';
import { salience } from './salience';


export function strategy<T>(strategyNames: string[]): (a: Match<T>, b: Match<T>) => number {
    const strategies: { [name: string]: ConflictResolutionStrategy<T> } = {
        salience: salience,
        bucketCounter: bucketCounter,
        factRecency: factRecency,
        activationRecency: activationRecency,
    };
    const strats = strategyNames.map(function (name) {
        return strategies[name];
    });
    const stratsLength = strats.length;

    return function (a: Match<T>, b: Match<T>) {
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
