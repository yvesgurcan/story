const Alea = require('alea');

// RNG is the only class that can be instantiated more than once. All other classes are singletons.
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
        return Math.random();
    }

    get next() {
        return this.rng();
    }

    range(min = 0, max = 100) {
        if (min > max) {
            throw new Error(`Min "${min}" greater than max "${max}".`);
        }

        return Math.floor(this.rng() * (max - min + 1)) + min;
    }
}

module.exports = RNG;
