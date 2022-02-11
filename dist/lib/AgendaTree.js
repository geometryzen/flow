// import Agenda from './Agenda';
import { AVLTree } from './trees/AVLTree';
import { EventBus } from './EventBus';
const DEFAULT_AGENDA_GROUP = 'main';
export class AgendaTree extends EventBus {
    constructor(flow, conflictResolution) {
        super();
        this.flow = flow;
        this.conflictResolution = conflictResolution;
        this.agendaGroups = {};
        this.agendaGroupStack = [DEFAULT_AGENDA_GROUP];
        this.rules = {};
        this.flow = flow;
        this.comparator = conflictResolution;
        this.setFocus(DEFAULT_AGENDA_GROUP).addAgendaGroup(DEFAULT_AGENDA_GROUP);
    }
    addAgendaGroup(groupName) {
        if (!this.agendaGroups[groupName]) {
            this.agendaGroups[groupName] = new AVLTree({ compare: this.comparator });
        }
    }
    setFocus(agendaGroup) {
        if (agendaGroup !== this.getFocused()) {
            this.agendaGroupStack.push(agendaGroup);
            this.emit('focused', agendaGroup, this);
        }
        return this;
    }
    getFocused() {
        const ags = this.agendaGroupStack;
        return ags[ags.length - 1];
    }
    fireNext() {
        throw new Error("Method not implemented.");
    }
    isEmpty() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=AgendaTree.js.map