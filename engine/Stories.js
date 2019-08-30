// Stories is not a singleton class.

class Stories {
    constructor(grammar, outputKey) {
        this.grammar = grammar;
        this.outputKey = outputKey;
    }

    get story() {
        return this.grammar.flatten(`#${this.outputKey}#`);
    }
}

module.exports = Stories;
