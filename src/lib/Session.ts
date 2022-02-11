/**
 *
 */
export interface Session<T> {
    /**
     * Declares the function to be called upon completion of the flow.
     * If the flow completes normally then there will be an undefined reason (error) and the facts will be defined.
     * If the flow completes abnormally, there will be a defined reason (error), and the facts may provide context.
     */
    execute(callback: (reason: unknown, facts: T) => void): void;
}
