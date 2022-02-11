import { ConflictResolutionStrategy } from './ConflictResolutionStrategy';
import { strategy } from './conflicts/strategy';
import { FlowSessionService } from './FlowSessionService';
import { Rule, RuleSettings } from './Rule';
import { Session } from './Session';

// const conflictResolution = strategy(['salience', 'activationRecency']);

/**
 * This is a Flow builder because I can define rules then create a Session.
 * The conflict resolution strategy is hard-code to salience (priority) and activationRecency.
 */
export class FlowContainer<T, S extends Session<T>> {
    private readonly conflictResolutionStrategy: ConflictResolutionStrategy<T, S>;
    private readonly rules: Rule<T, S>[] = [];
    constructor(private flowSessionService: FlowSessionService<T, S>) {
        this.conflictResolutionStrategy = strategy(['salience', 'activationRecency']);
    }
    /**
     * Declare a rule which consists of a pattern matching function and an action  function.
     * @param name The name of the rule.
     * @param options TODO: What does this do?
     * @param pattern A function that is given the facts and returns a boolean indicating whether the rule can be executed.
     * @param action The action that is executed if the pattern matches the facts.
     */
    rule(
        name: string,
        options: Partial<RuleSettings>,
        pattern: (facts: T) => boolean,
        action: (facts: T, session: S, next: (reason?: unknown) => void) => void
    ): void {
        this.rules.push(new Rule<T, S>(name, options, pattern, action));
    }
    /**
     * Creates a Session of the kind specified by the FlowSessionService in the constructor.
     * @param facts The facts are provided to the session.
     */
    createSession(facts: T): S {
        return this.flowSessionService.createSession(this.rules, this.conflictResolutionStrategy, facts);
    }
}
