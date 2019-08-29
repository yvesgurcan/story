const RNG = require('./RNG');

let instance = null;

class RNGSingleton extends RNG {
    constructor(seed) {
        super();
        if (!instance) {
            this.init(seed);
            instance = this;
            return this;
        } else {
            return instance;
        }
    }
}

module.exports = RNGSingleton;
