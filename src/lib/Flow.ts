import { AgendaTree } from './AgendaTree';
import { ConflictResolutionStrategy } from './ConflictResolutionStrategy';
import { EventBus } from './EventBus';
import { ExecutionStrategy } from './ExecutionStrategy';
import { RootNode } from './nodes/RootNode';
import { Session } from './Session';
import { WorkingMemory } from './WorkingMemory';

/**
 * A Flow is a Session.
 */
export class Flow<T> extends EventBus<Flow<T>> implements Session<T> {
    agenda: AgendaTree<T>;
    executionStrategy: ExecutionStrategy<T> | undefined;
    rootNode: RootNode<T>;
    workingMemory: WorkingMemory;
    // private __rules: {};
    constructor(private name: string, private conflictResolutionStrategy: ConflictResolutionStrategy<T, Session<T>>) {
        super();
        this.name = name;
        // this.__rules = {};
        this.conflictResolutionStrategy = conflictResolutionStrategy;
        this.workingMemory = new WorkingMemory();
        this.agenda = new AgendaTree(this, conflictResolutionStrategy);
        this.rootNode = new RootNode(this.workingMemory, this.agenda);
    }
    assert(fact: unknown) {
        throw new Error(`Flow.assert(${fact})`);
    }
    modify(fact: unknown) {
        throw new Error(`Flow.modify(${fact})`);
    }
    retract(fact: unknown) {
        throw new Error(`Flow.retract(${fact})`);
    }
    getFacts(type: unknown): unknown[] {
        console.log(`Flow.getFacts(${type})`);
        return [];
    }
    execute(callback: (reason: unknown, facts: T) => void): Promise<void> {
        // TODO: If the callback is not called then how does the callee know what happened?
        console.log(`Flow.execute(${typeof callback})`);
        this.executionStrategy = new ExecutionStrategy(this);
        return this.executionStrategy.execute();
    }
    matchUntilHalt(): void {
        // We need $q to be injected, and hence into the service
        throw new Error('matchUntilHalt');
    }
    dispose(): void {
        // TODO
    }
}
