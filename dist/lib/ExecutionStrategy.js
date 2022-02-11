/**
 *
 */
export class ExecutionStrategy {
    constructor(flow, matchUnitilHalt) {
        this.flow = flow;
        this.agenda = flow.agenda;
        this.matchUntilHalt = !!matchUnitilHalt;
    }
    onAlter() {
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
    __handleAsyncNext(next) {
        return next.then((promiseValue) => {
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
                }
                else {
                    return this.callback();
                }
            }
            else if (!this.matchUntilHalt || this.__halted) {
                return this.callback();
            }
        }, this.errorCallback);
    }
    callback() {
        this.tearDown();
        throw new Error('ExecutionStrategy.callback()');
    }
    callNext() {
        this.looping = true;
        const next = this.agenda.fireNext();
        return this.__handleAsyncNext(next);
    }
    execute() {
        this.setup();
        return this.callNext();
    }
}
//# sourceMappingURL=ExecutionStrategy.js.map