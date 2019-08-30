const mapValues = require('lodash/mapValues');
const map = require('lodash/map');
const Stories = require('./Stories');

let instance = null;

class Grammar {
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
        const RNGSingleton = require('./RNGSingleton');
        this.rng = new RNGSingleton();

        this.tracery = require('../lib/tracery');
        this.tracery.setRNG(this.rng);
    }

    create(rules, outputKey = 'models') {
        const { models, ...concepts } = rules;
        const flatConcepts = mapValues(concepts, concept =>
            map(concept, word => word.name || word)
        );

        const flatRules = {
            ...flatConcepts,
            models
        };

        const grammar = this.tracery.createGrammar(flatRules);
        grammar.addModifiers(this.tracery.baseEngModifiers);

        return new Stories(grammar, outputKey);
    }
}

module.exports = Grammar;
