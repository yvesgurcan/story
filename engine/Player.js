const RNGSingleton = require('./RNGSingleton');

let instance = null;

class Player {
    constructor() {
        this.rng = new RNGSingleton();
        if (!instance) {
            instance = this;
            return this;
        } else {
            return instance;
        }
    }

    init() {
        const attributes = {
            strength: 10,
            dexterity: 10,
            intelligence: 10,
            willpower: 10,
            luck: 10
        };

        const pointsToDistribute = 5;

        this.attributes = attributes;
        this.pointsToDistribute = pointsToDistribute;
    }

    calculateVitals() {
        const { attributes } = this;
        const vitals = {
            health: this.calculateMaxHealth(attributes.strength),
            stamina: this.calculateMaxStamina(attributes.strength),
            mana: this.calculateMaxMana(attributes.intelligence)
        };

        this.vitals = vitals;
    }

    calculateMaxHealth(strength) {
        return Math.floor(strength * 5);
    }

    calculateMaxStamina(strength) {
        return Math.floor(strength * 12);
    }

    calculateMaxMana(intelligence) {
        return Math.floor(intelligence * 4);
    }

    get stats() {
        return this.player;
    }
}

module.exports = Player;
