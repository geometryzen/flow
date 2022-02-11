import { ConflictResolutionStrategy } from './ConflictResolutionStrategy';
import { Rule } from './Rule';
import { Session } from './Session';

export interface FlowSessionService<T, S extends Session<T>> {
    createSession(rules: Rule<T, S>[], conflictResolutionStrategy: ConflictResolutionStrategy<T, S>, facts: T): S;
}
