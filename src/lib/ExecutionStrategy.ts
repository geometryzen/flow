import { AgendaTree } from './AgendaTree';
import { Flow } from './Flow';
import { RootNode } from './nodes/RootNode';

/**
 * Used by the Flow implementation of Session.
 */
export class ExecutionStrategy<T> {
    flow: Flow<T>;
    flowAltered: boolean | undefined;
    looping: boolean | undefined;
    matchUntilHalt: boolean | undefined;
    rootNode: RootNode<T> | undefined;
    agenda: AgendaTree<T>;
    private __halted: boolean | undefined;
    private assertHandler?: () => void;
    private modifyHandler?: () => void;
    private retractHandler?: () => void;
    private errorCallback?: (reason: unknown) => void;
    constructor(flow: Flow<T>, matchUntilHalt?: boolean) {
        this.flow = flow;
        this.agenda = flow.agenda;
        this.matchUntilHalt = !!matchUntilHalt;
    }

    private onAlter() {
        this.flowAltered = true;
        if (!this.looping && this.matchUntilHalt && !this.__halted) {
            this.callNext();
        }
    }

    setup() {
        const flow = this.flow;
        if (this.rootNode) {
            this.rootNode.resetCounter();
        }

        const assertHandler = () => {
            this.onAlter();
        };
        flow.on('assert', assertHandler);
        this.assertHandler = assertHandler;

        const modifyHandler = () => {
            this.onAlter();
        };
        flow.on('modify', modifyHandler);
        this.modifyHandler = modifyHandler;

        const retractHandler = () => {
            this.onAlter();
        };
        flow.on('retract', retractHandler);
        this.retractHandler = retractHandler;
    }

    tearDown() {
        const flow = this.flow;
        if (this.assertHandler) {
            flow.removeListener('assert', this.assertHandler);
            this.assertHandler = void 0;
        }
        if (this.modifyHandler) {
            flow.removeListener('modify', this.modifyHandler);
            this.modifyHandler = void 0;
        }
        if (this.retractHandler) {
            flow.removeListener('retract', this.retractHandler);
            this.retractHandler = void 0;
        }
    }

    private __handleAsyncNext(next: Promise<unknown>): Promise<void> {
        return next.then(() => {
            this.looping = false;
            if (this.agenda && !this.agenda.isEmpty()) {
                if (this.flowAltered) {
                    if (this.rootNode) {
                        this.rootNode.incrementCounter();
                    }
                    this.flowAltered = false;
                }
                if (!this.__halted) {
                    return this.callNext();
                } else {
                    return this.callback();
                }
            } else if (!this.matchUntilHalt || this.__halted) {
                return this.callback();
            }
        }, this.errorCallback);
    }

    callback() {
        this.tearDown();
        throw new Error('ExecutionStrategy.callback()');
    }

    callNext(): Promise<void> {
        this.looping = true;
        const next = this.agenda.fireNext();
        return this.__handleAsyncNext(next);
    }

    execute(): Promise<void> {
        this.setup();
        return this.callNext();
    }
}
