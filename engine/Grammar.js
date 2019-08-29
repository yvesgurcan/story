const tracery = require('tracery-grammar');

const RNGSingleton = require('./RNGSingleton');

let instance = null;

class Grammar {
    constructor() {
        var grammar = tracery.createGrammar({
            animal: ['panda', 'fox', 'capybara', 'iguana'],
            emotion: ['sad', 'happy', 'angry', 'jealous'],
            origin: ['I am #emotion.a# #animal#.']
        });

        grammar.addModifiers(tracery.baseEngModifiers);

        console.log(grammar.flatten('#origin#'));
    }
}

module.exports = Grammar;
