const Environment = require('./Environment');
const Space = require('./Space');

const environments = require('../world/environments');
const events = require('../world/events');

let instance = null;

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
        environments.forEach(environment => {
            const generatedEnvironment = new Environment(environment);
            const spaces = [];
            environment.spaces.forEach(space => {
                if (this.rng.check(space.probability)) {
                    const generatedSpace = new Space(space);
                    spaces.push(generatedSpace);
                }
            });

            generatedEnvironment.spaces = spaces;

            console.log(generatedEnvironment.name, spaces);

            generatedEnvironments.push(generatedEnvironment);
        });

        this.environments = generatedEnvironments;
    }
}

module.exports = World;
