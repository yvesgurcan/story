const Alea = require('alea');
const console = require('../lib/console');

// RNG is not a singleton class.
class RNG {
    init(seed) {
        if (this.seed) {
            throw new Error('RNG already initialized.');
        }

        this.seed = seed === undefined ? this.newSeed : seed;
        this.rng = new Alea(this.seed);
        return this;
    }

    get newSeed() {
        const seed = Math.random();
        console.debug({ seed });
        return seed;
    }

    get next() {
        return this.rng();
    }

    get name() {
        const nameLength = this.range(2, 13);

        let name = '';
        for (let i = 0; i < nameLength; i++) {
            name += 'e';
        }

        return name;
    }

    range(min = 0, max = 100) {
        if (min > max) {
            throw new Error(`Min "${min}" greater than max "${max}".`);
        }

        return Math.floor(this.rng() * (max - min + 1)) + min;
    }

    check(threshold) {}
}

module.exports = RNG;
