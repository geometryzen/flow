import { ConflictResolutionStrategy } from './ConflictResolutionStrategy';
import { Match } from './Match';
import { Rule } from './Rule';
import { Session } from './Session';

export class NaiveSession<T> implements Session<T> {
    constructor(private rules: Rule<T>[], private conflictResolutionStrategy: ConflictResolutionStrategy<T>, private facts: T) {
        if (!conflictResolutionStrategy) {
            throw new Error('conflictResolutionStrategy must be defined');
        }
    }
    execute(callback: (reason: unknown, facts: T) => void): void {
        const advance = () => {
            const matching: Match<T>[] = [];
            const rLen = this.rules.length;
            for (let r = 0; r < rLen; r++) {
                const rule = this.rules[r];
                if (rule.pattern(this.facts)) {
                    const match: Match<T> = {
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
            let winner: Match<T> | null = null;
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
