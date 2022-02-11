export class EventBus<E> {
    on(name: string, callback: () => void) {
        throw new Error(`Method not implemented. on(${name} ${typeof callback})`);
    }
    emit(name: string, group: string, value: E): void {
        throw new Error(`Method not implemented. emit(${name} ${group} ${value})`);
    }
    removeListener(name: string, callback: () => void): void {
        throw new Error(`Method not implemented. removeListener(${name} ${typeof callback})`);
    }
}