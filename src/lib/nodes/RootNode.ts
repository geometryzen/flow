import { AgendaTree } from '../AgendaTree';
import { WorkingMemory } from '../WorkingMemory';

export class RootNode<T> {
    constructor(public readonly workingMemory: WorkingMemory, public readonly agenda: AgendaTree<T>) {
        throw new Error('RootNode.constructor');
    }
    incrementCounter() {
        throw new Error('RootNode.incrementCounter');
    }
    resetCounter() {
        throw new Error('RootNode.resetCounter');
    }
}
