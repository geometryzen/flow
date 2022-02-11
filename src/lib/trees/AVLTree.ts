import { ConflictResolutionStrategy } from "../ConflictResolutionStrategy";
import { Session } from '../Session';

export class AVLTree<T> {
    constructor(public readonly options: { compare: ConflictResolutionStrategy<T, Session<T>> }) {
        // TODO
    }
}
