// import Agenda from './Agenda';
import { ConflictResolutionStrategy } from './ConflictResolutionStrategy';
import { EventBus } from './EventBus';
import { Flow } from './Flow';
import { Session } from './Session';
import { AVLTree } from './trees/AVLTree';

const DEFAULT_AGENDA_GROUP = 'main';

export class AgendaTree<T> extends EventBus<AgendaTree<T>> {
    agendaGroups: { [groupName: string]: AVLTree<T> };
    agendaGroupStack: string[];
    // rules: {};
    comparator: ConflictResolutionStrategy<T, Session<T>>;
    constructor(private flow: Flow<T>, private conflictResolution: ConflictResolutionStrategy<T, Session<T>>) {
        super();
        this.agendaGroups = {};
        this.agendaGroupStack = [DEFAULT_AGENDA_GROUP];
        // this.rules = {};
        this.flow = flow;
        this.comparator = conflictResolution;
        this.setFocus(DEFAULT_AGENDA_GROUP).addAgendaGroup(DEFAULT_AGENDA_GROUP);
    }

    addAgendaGroup(groupName: string) {
        if (!this.agendaGroups[groupName]) {
            this.agendaGroups[groupName] = new AVLTree({ compare: this.comparator });
        }
    }

    setFocus(agendaGroup: string) {
        if (agendaGroup !== this.getFocused()) {
            this.agendaGroupStack.push(agendaGroup);
            this.emit('focused', agendaGroup, this);
        }
        return this;
    }

    getFocused(): string {
        const ags = this.agendaGroupStack;
        return ags[ags.length - 1];
    }

    fireNext(): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

    isEmpty(): boolean {
        throw new Error("Method not implemented.");
    }
}
