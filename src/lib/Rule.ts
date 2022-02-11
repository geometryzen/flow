import { Session } from './Session';

export interface RuleSettings {
    priority: number;
}

/**
 * Rule is parameterized by the Session so that the action gets a useful session.
 */
export class Rule<T, S extends Session<T>> {
    /**
     * The priority of the rule is set by the options or defaults to 0.
     */
    public priority: number;

    /**
     *
     */
    constructor(
        /**
         * The name of the rule.
         */
        public name: string,
        options: Partial<RuleSettings>,
        /**
         * The pattern function. If it returns true the pattern is said to have matched the facts and the action may be executed.
         */
        public pattern: (facts: T) => boolean,
        /**
         * The action function. It is responsible for calling next with either no argument or an error.
         * The action will typically perform some useful data gathering and update the facts.
         */
        public action: (facts: T, session: S, next: (error: unknown) => void) => void
    ) {
        this.priority = options.priority || 0;
    }
}
