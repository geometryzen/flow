export class NaiveSession {
    constructor(rules, conflictResolutionStrategy, facts) {
        this.rules = rules;
        this.conflictResolutionStrategy = conflictResolutionStrategy;
        this.facts = facts;
        if (!conflictResolutionStrategy) {
            throw new Error('conflictResolutionStrategy must be defined');
        }
    }
    execute(callback) {
        const advance = () => {
            const matching = [];
            const rLen = this.rules.length;
            for (let r = 0; r < rLen; r++) {
                const rule = this.rules[r];
                if (rule.pattern(this.facts)) {
                    const match = {
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
            let winner = null;
            if (matching.length === 1) {
                winner = matching[0];
            }
            else {
                matching.sort(this.conflictResolutionStrategy);
                winner = matching[0];
            }
            if (winner) {
                winner.rule.action(this.facts, this, (reason) => {
                    if (reason) {
                        callback(reason, this.facts);
                    }
                    else {
                        // Recurse.
                        advance();
                    }
                });
            }
            else {
                callback(void 0, this.facts);
            }
        };
        advance();
    }
}
//# sourceMappingURL=NaiveSession.js.map