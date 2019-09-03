const uuid = require('uuid/v4');
const console = require('../lib/console');
const Environment = require('./Environment');
const Node = require('./Node');
const environments = require('../world/environments');
const nodes = require('../world/nodes');

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

const EMPTY_NODE = {
    name: 'empty'
};

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

        console.log('------');

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

        const minNodes = Math.max(
            generatedNodes.length,
            environment.minNodes || environment.nodes.length
        );

        let nodeDiff = minNodes - generatedNodes.length;
        if (nodeDiff) {
            for (let i = 0; i < nodeDiff; i++) {
                this.generateNode(EMPTY_NODE, generatedNodes);
            }
        }

        this.duplicateRandomNode(environment, generatedNodes);

        generatedEnvironment.nodes = generatedNodes;

        console.debug(generatedEnvironment);
        console.debug({
            generatedNodes: generatedNodes.length,
            minNodes,
            nodeDiff
        });
        console.debug('------');

        generatedEnvironments.push(generatedEnvironment);
    }

    connectEnvironment(environment, environments) {}

    generateNode(node, generatedNodes) {
        for (let i = 0; i < (node.maxOccurrences || 1); i++) {
            if (this.rng.chance(node.probability || 1)) {
                const generatedNode = new Node({
                    ...node,
                    id: uuid()
                });
                generatedNodes.push(generatedNode);
            }
        }
    }

    duplicateRandomNode(environment, generatedNodes) {
        if (this.rng.chance(0.3)) {
            const nodesWithProbabilities = this.getNodesWithProbability(
                environment,
                generatedNodes
            );
            const node = this.rng.pickElementDistributed(
                nodesWithProbabilities
            );
            const generatedNode = new Node({
                ...node,
                id: uuid()
            });
            generatedNodes.push(generatedNode);
        }
    }

    getNodesWithProbability(environment, generatedNodes) {
        return generatedNodes.map(genNode => {
            const node = {
                ...(environment.nodes.find(
                    node => node.name === genNode.name
                ) || {})
            };

            return {
                ...genNode,
                probability: node.probability || this.rng.next
            };
        });
    }
}

module.exports = World;
