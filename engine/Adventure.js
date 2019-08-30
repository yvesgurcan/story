const Grammar = require('./Grammar');
const stories = require('../stories');

let instance = null;

class Adventure {
    constructor() {
        if (!instance) {
            this.init();
            instance = this;
            return this;
        } else {
            return instance;
        }
    }

    init() {
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

module.exports = Adventure;
