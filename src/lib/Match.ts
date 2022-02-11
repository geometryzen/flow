import { Rule } from './Rule';
import { Session } from './Session';

export interface Match<T, S extends Session<T>> {
    /**
     * This is set to the name of the rule in the case of the NaiveSession.
     */
    name: string;
    hashCode: number;
    /**
     * The rule that will have its action fired if the match wins.
     * also contains the priority, which is examined by the salience strategy.
     */
    rule: Rule<T, S>;
    /**
     * Always zero for as NaiveSession.
     */
    counter: number;
    /**
     * May be used to compare matches. Always zero for a NaiveSession.
     */
    recency: number;
    /**
     * Used by the factRecency strategy.
     */
    match: {
        recency: number[];
    };
}
