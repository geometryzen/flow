import { AgendaTree } from './AgendaTree';
import { EventBus } from './EventBus';
import { ExecutionStrategy } from './ExecutionStrategy';
import { RootNode } from './nodes/RootNode';
import { WorkingMemory } from './WorkingMemory';
export class Flow extends EventBus {
    constructor(name, conflictResolutionStrategy) {
        super();
        this.name = name;
        this.conflictResolutionStrategy = conflictResolutionStrategy;
        this.name = name;
        this.__rules = {};
        this.conflictResolutionStrategy = conflictResolutionStrategy;
        this.workingMemory = new WorkingMemory();
        this.agenda = new AgendaTree(this, conflictResolutionStrategy);
        this.rootNode = new RootNode(this.workingMemory, this.agenda);
    }
    assert(fact) {
        throw new Error('Flow.assert');
    }
    modify(fact) {
        throw new Error('Flow.modify');
    }
    retract(fact) {
        throw new Error('Flow.retract');
    }
    getFacts(type) {
        return [];
    }
    execute(callback) {
        this.executionStrategy = new ExecutionStrategy(this);
        return this.executionStrategy.execute();
    }
    matchUntilHalt() {
        // We need $q to be injected, and hence into the service
        throw new Error('matchUntilHalt');
    }
    dispose() {
        // TODO
    }
}
//# sourceMappingURL=Flow.js.map