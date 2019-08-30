const stories = require('../stories');

// Environment is not a singleton class.

class Environment {
    constructor(environment) {
        this.init(environment);
    }

    init(environment) {
        this.name = environment.name;
    }

    generateStory() {
        const Grammar = require('./Grammar');
        this.grammar = new Grammar();

        const rules = {
            ...stories,
            model1: ['You #perceive# #person.a# #position# #place.the#.'],
            model2: [
                '#person.a.capitalize# #perceive.s# you #approach.ing# from #place.the#.'
            ],
            models: ['#model1#', '#model2#']
        };

        this.adventures = this.grammar.create(rules);
        // console.log(this.adventures.story);
    }
}

module.exports = Environment;
