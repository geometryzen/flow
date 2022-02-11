/**
 *
 */
export class Rule {
    /**
     *
     */
    constructor(name, options, pattern, action) {
        this.name = name;
        this.pattern = pattern;
        this.action = action;
        this.priority = options.priority || options.salience || 0;
    }
}
//# sourceMappingURL=Rule.js.map