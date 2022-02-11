import { ConflictResolutionStrategy } from './ConflictResolutionStrategy';
import { strategy } from './conflicts/strategy';
import { FlowSessionService } from './FlowSessionService';
import { Rule } from './Rule';
import { Session } from './Session';

// const conflictResolution = strategy(['salience', 'activationRecency']);

/**
 * This is a Flow builder because I can define rules then create a Session.
 */
export class FlowContainer<T> {
    private readonly conflictResolutionStrategy: ConflictResolutionStrategy<T>;
    private readonly rules: Rule<T>[] = [];
    constructor(private flowSessionService: FlowSessionService) {
        this.conflictResolutionStrategy = strategy(['salience', 'activationRecency']);
    }
    /**
     * Declare a rule.
     * @param name
     * @param options TODO: What does this do?
     * @param pattern A function that is given the facts and returns a boolean indicating whether the rule can be executed.
     * @param action
     */
    rule(
        name: string,
        options: {
            salience?: number;
            scope?: { [name: string]: unknown };
        },
        pattern: (facts: T) => boolean,
        action: (facts: T, session: Session<T>, next: (reason?: unknown) => void) => void
    ): void {
        this.rules.push(new Rule<T>(name, options, pattern, action));
    }
    createSession(initialFacts: T): Session<T> {
        return this.flowSessionService.createSession(this.rules, this.conflictResolutionStrategy, initialFacts);
    }
}
