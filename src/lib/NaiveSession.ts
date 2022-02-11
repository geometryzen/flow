import { ConflictResolutionStrategy } from './ConflictResolutionStrategy';
import { Match } from './Match';
import { Rule } from './Rule';
import { Session } from './Session';

/**
 * A Session with fixed rules and a fixed conflict resolution strategy.
 */
export class NaiveSession<T> implements Session<T> {
    /**
     * 
     * @param rules 
     * @param conflictResolutionStrategy Used to order the Rule matches if more than one rule fires.
     * @param facts 
     */
    constructor(private readonly rules: Rule<T, NaiveSession<T>>[], private readonly conflictResolutionStrategy: ConflictResolutionStrategy<T, NaiveSession<T>>, private facts: T) {
        if (!conflictResolutionStrategy) {
            throw new Error('conflictResolutionStrategy must be defined');
        }
    }
    /**
     * Examines the rules for matches repeatedly, resolves conflicts, calls the actions for the winning rule.
     * @param callback Called when either no more rules match or the action of a rule produces an error.
     */
    execute(callback: (reason: unknown, facts: T) => void): void {
        /**
         * A function that will be called once to get things going and that may call itself recursively until completion of the session.
         * If the action of a rule is called with an error than recursion stops and the callback is called with the error.
         * When there are no more matches, our work is done and the callback is invoked with the facts only.
         */
        const advance = () => {
            const matching: Match<T, NaiveSession<T>>[] = [];
            const rLen = this.rules.length;
            for (let r = 0; r < rLen; r++) {
                const rule = this.rules[r];
                if (rule.pattern(this.facts)) {
                    const match: Match<T, NaiveSession<T>> = {
                        name: rule.name,
                        hashCode: 0,
                        rule,
                        counter: 0,
                        recency: 0,
                        match: { recency: [] },
                    };
                    matching.push(match);
                }
            }
            let winner: Match<T, NaiveSession<T>> | null = null;
            if (matching.length === 1) {
                winner = matching[0];
            } else {
                matching.sort(this.conflictResolutionStrategy);
                winner = matching[0];
            }
            if (winner) {
                winner.rule.action(this.facts, this, (reason: unknown) => {
                    if (reason) {
                        callback(reason, this.facts);
                    } else {
                        // Recurse.
                        advance();
                    }
                });
            } else {
                callback(void 0, this.facts);
            }
        };
        advance();
    }
}
