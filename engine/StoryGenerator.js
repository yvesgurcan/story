// StoryGenerator is not a singleton class.

class StoryGenerator {
    constructor(grammar, outputKey) {
        this.grammar = grammar;
        this.outputKey = outputKey;
    }

    get story() {
        return this.grammar.expand(`#${this.outputKey}#`);
    }
}

module.exports = StoryGenerator;
