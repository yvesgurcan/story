const prompts = require('prompts');
const toPairs = require('lodash/toPairs');
const capitalize = require('lodash/capitalize');
const console = require('../lib/console');

const { DEBUG, SEED } = process.env;
console.debug({ DEBUG });
console.debug(SEED ? { SEED } : '__QUIET__');

const SEPARATOR =
    '----------------------------------------------------------------------';

const MENU_OPTIONS = ['New Game', 'Load Game', 'Quit'];

class GameLoop {
    constructor() {
        this.init();
    }

    init() {
        const RNGSingleton = require('./RNGSingleton');
        this.rng = new RNGSingleton(SEED);
        const RNGClass = require('./RNG');
        this.rngUnseeded = new RNGClass();
        this.rngUnseeded.initUnseeded();

        if (DEBUG) {
            console.debug(`Name: ${this.rngUnseeded.name}`);
            this.createWorld();
            return;
        }

        this.displayMainMenu();
    }

    async confirmQuit() {
        const { confirm } = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: `Are you sure you want to quit?`
        });

        if (confirm) {
            process.exit(0);
        } else {
            console.log('');
            await this.displayMainMenu();
        }
    }

    async displayMainMenu() {
        const { choice } = await prompts({
            type: 'select',
            name: 'choice',
            message: `What would you like to do?`,
            choices: MENU_OPTIONS.map(option => option)
        });
        console.log('');

        switch (choice) {
            default: {
                break;
            }
            case 0: {
                this.createWorld();
                await this.createCharacter();
                break;
            }
            case 2: {
                await this.confirmQuit();
            }
        }
    }

    async createCharacter() {
        const Player = require('./Player');
        this.player = new Player();
        await this.promptName();
        console.log(SEPARATOR);
        this.displayPlayerAttributes();
        console.log(SEPARATOR);
        await this.distributeExtraPoints();
        this.calculateVitals();

        console.log('\nYour new stats:');
        this.displayPlayerStats();
    }

    displayName() {
        console.log(`Name: ${this.player.name}`);
    }

    displayPlayerAttributes() {
        const attributes = toPairs(this.player.attributes);
        attributes.forEach(([attributeName, attributeValue]) =>
            console.log(`${capitalize(attributeName)}: ${attributeValue}`)
        );
    }

    displayPlayerVitals() {
        const vitals = toPairs(this.player.vitals);
        vitals.forEach(([vitalName, vitalValue]) =>
            console.log(`${capitalize(vitalName)}: ${vitalValue}`)
        );
    }

    displayPlayerStats() {
        console.log(SEPARATOR);
        this.displayName();
        this.displayPlayerAttributes();
        console.log(SEPARATOR);
        this.displayPlayerVitals();
        console.log(SEPARATOR);
    }

    async promptName() {
        const { name } = await prompts({
            type: 'text',
            name: 'name',
            message: `Enter the name of your character:`
        });
        this.player.name = name === '' ? this.rngUnseeded.name : name;
        console.log('');
    }

    async distributeExtraPoints() {
        const attributes = toPairs(this.player.attributes);

        for (let i = 0; i < attributes.length; i++) {
            if (this.player.pointsToDistribute) {
                const [attributeName] = attributes[i];
                const { extraPoints = 0 } = await prompts({
                    type: 'number',
                    name: 'extraPoints',
                    message: `You have ${this.player.pointsToDistribute} points to distribute. How many do you want to add to your ${attributeName}?`,
                    validate: value => {
                        if (value > this.player.pointsToDistribute) {
                            return `You don't have enough points.`;
                        } else if (value < 0) {
                            return `You can't subtract points.`;
                        }

                        return true;
                    }
                });

                this.player.pointsToDistribute =
                    this.player.pointsToDistribute - extraPoints;

                const originalValue = this.player.attributes[attributeName];
                this.player.attributes[attributeName] =
                    originalValue + extraPoints;
            }
        }
    }

    calculateVitals() {
        this.player.calculateVitals();
    }

    createWorld() {
        console.log(`Creating world...\nSeed: ${this.rng.seed}\n`);
        const World = require('./World');
        this.world = new World();
    }
}

module.exports = GameLoop;
