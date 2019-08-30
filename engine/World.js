const uuid = require('uuid/v4');
const console = require('../lib/console');
const Environment = require('./Environment');
const Space = require('./Space');
const environments = require('../world/environments');
const events = require('../world/events');

let instance = null;

const CONNECTION_PROBABILITIES = [
    {
        value: 2,
        probability: 0.45
    },
    {
        value: 3,
        probability: 0.15
    },
    {
        value: 4,
        probability: 0.1
    }
];

class World {
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

        let generatedEnvironments = [];
        environments.forEach(environment =>
            this.generateEnvironment(environment, generatedEnvironments)
        );

        generatedEnvironments.map(environment =>
            this.connectEnvironment(environment, generatedEnvironments)
        );

        this.environments = generatedEnvironments;
    }

    generateEnvironment(environment, generatedEnvironments) {
        const generatedEnvironment = new Environment({
            ...environment,
            id: uuid()
        });
        const generatedSpaces = [];
        environment.spaces.forEach(space =>
            this.generateSpace(space, generatedSpaces)
        );

        generatedEnvironment.spaces = generatedSpaces;

        console.debug(generatedEnvironment);

        generatedEnvironments.push(generatedEnvironment);
    }

    connectEnvironment(environment, environments) {
        const numberOfConnections = this.rng.pickElementDistributed(
            CONNECTION_PROBABILITIES
        );
        console.debug({ numberOfConnections });
    }

    generateSpace(space, generatedSpaces) {
        if (this.rng.chance(space.probability)) {
            const generatedSpace = new Space({
                ...space,
                id: uuid()
            });
            generatedSpaces.push(generatedSpace);
        }
    }
}

module.exports = World;
