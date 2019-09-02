const uuid = require('uuid/v4');
const console = require('../lib/console');
const Environment = require('./Environment');
const Node = require('./Node');
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
        const generatedNodes = [];
        environment.nodes.forEach(node =>
            this.generateNode(node, generatedNodes)
        );

        generatedEnvironment.nodes = generatedNodes;

        console.debug(generatedEnvironment);

        generatedEnvironments.push(generatedEnvironment);
    }

    connectEnvironment(environment, environments) {
        /*
        const numberOfConnections = this.rng.pickElementDistributed(
            CONNECTION_PROBABILITIES
        );
        console.debug({ numberOfConnections });
        */
    }

    generateNode(node, generatedNodes) {
        if (this.rng.chance(node.probability)) {
            const generatedNode = new Node({
                ...node,
                id: uuid()
            });
            generatedNodes.push(generatedNode);
        }
    }
}

module.exports = World;
