import { strategy } from './conflicts/strategy';
import { Rule } from './Rule';
// const conflictResolution = strategy(['salience', 'activationRecency']);
/**
 * This is a Flow builder because I can define rules then create a Session.
 */
export class FlowContainer {
    constructor(flowSessionService) {
        this.flowSessionService = flowSessionService;
        this.rules = [];
        this.conflictResolutionStrategy = strategy(['salience', 'activationRecency']);
    }
    /**
     * Declare a rule.
     * @param name
     * @param options TODO: What does this do?
     * @param pattern A function that is given the facts and returns a boolean indicating whether the rule can be executed.
     * @param action
     */
    rule(name, options, pattern, action) {
        this.rules.push(new Rule(name, options, pattern, action));
    }
    createSession(initialFacts) {
        return this.flowSessionService.createSession(this.rules, this.conflictResolutionStrategy, initialFacts);
    }
}
//# sourceMappingURL=FlowContainer.js.map