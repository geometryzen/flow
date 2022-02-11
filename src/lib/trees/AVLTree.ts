import { ConflictResolutionStrategy } from "../ConflictResolutionStrategy";

export class AVLTree<T> {
    constructor(public readonly options: { compare: ConflictResolutionStrategy<T> }) {
        // TODO
    }
}
