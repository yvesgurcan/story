const Grammar = require('./Grammar');
const place = require('../concepts/place');
const position = require('../concepts/position');
const person = require('../concepts/person');
const perceive = require('../concepts/perceive');
const approach = require('../concepts/approach');

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
            approach,
            place,
            position,
            person,
            perceive,
            model1: ['You #perceive# #person.a# #position# #place.the#.'],
            model2: [
                '#person.a.capitalize# #perceive.s# you #approach.ing# from #place.the#.'
            ],
            models: ['#model1#', '#model2#']
        };

        this.adventures = this.grammar.create(rules);
        console.log(this.adventures.story);
    }
}

module.exports = Adventure;
