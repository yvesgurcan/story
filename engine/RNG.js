const Alea = require('alea');
const flatten = require('lodash/flatten');

const VOWELS = [
    { value: 'a', coef: 3 },
    { value: 'e', coef: 3 },
    { value: 'i', coef: 1 },
    { value: 'o', coef: 4 },
    { value: 'u', coef: 3 },
    { value: 'y', coef: 3 }
];

const VOWELS_FLATTEN = flatten(
    VOWELS.map(({ value, coef }) => Array(coef).fill(value))
);

const VOWELS_LETTERS = VOWELS.map(object => object.value);

const CONSONANTS = [
    { value: 'b', coef: 4 },
    { value: 'c', coef: 2 },
    { value: 'd', coef: 3 },
    { value: 'f', coef: 4 },
    { value: 'g', coef: 1 },
    { value: 'h', coef: 8 },
    { value: 'j', coef: 2 },
    { value: 'k', coef: 4 },
    { value: 'l', coef: 4 },
    { value: 'm', coef: 4 },
    { value: 'n', coef: 4 },
    { value: 'p', coef: 1 },
    { value: 'q', coef: 1 },
    { value: 'r', coef: 4 },
    { value: 's', coef: 4 },
    { value: 't', coef: 5 },
    { value: 'v', coef: 1 },
    { value: 'w', coef: 1 },
    { value: 'x', coef: 1 },
    { value: 'z', coef: 1 }
];

const CONSONANTS_FLATTEN = flatten(
    CONSONANTS.map(({ value, coef }) => Array(coef).fill(value))
);

const CONSONANTS_LETTERS = CONSONANTS.map(object => object.value);

const COMPOUND = ['-', "'"];

const MIN_NAME_LENGTH_FOR_COMPOUND_CHARACTER = 4;
const MIN_POSITION_FOR_COMPOUND_CHARACTER = 3;
const MAX_POSITION_TO_END_FOR_COMPOUND_CHARACTER = 3;

// RNG is not a singleton class.
class RNG {
    init(seed) {
        if (!this.rng) {
            this.seed = seed === undefined ? this.newSeed : seed;
            this.rng = new Alea(this.seed);
            return this;
        } else {
            throw new Error('RNG already initialized.');
        }
    }

    initUnseeded() {
        if (!this.rng) {
            this.rng = new Alea();
            return this;
        } else {
            throw new Error('RNG already initialized.');
        }
    }

    get newSeed() {
        return Math.random();
    }

    get next() {
        return this.rng();
    }

    get name() {
        const nameLength = this.range(4, 10);

        let name = '';
        let hasCompoundCharacter = false;
        for (let i = 0; i < nameLength; i++) {
            let character;
            const penultimateCharacter = name[name.length - 2] || '';
            const lastCharacter = name[name.length - 1] || '';
            const compoundCharacter = this.element(COMPOUND);
            if (
                // compound character is not suitable for short names
                nameLength >= MIN_NAME_LENGTH_FOR_COMPOUND_CHARACTER &&
                // compound character is not suitable as first letter
                name &&
                // compound character is not suitable as last letter
                name.length !== nameLength - 1 &&
                // only one compound character per name
                !hasCompoundCharacter &&
                // name must already be a certain size
                name.length >= MIN_POSITION_FOR_COMPOUND_CHARACTER &&
                // name can not be already greater than a certain size
                name.length <
                    nameLength - MAX_POSITION_TO_END_FOR_COMPOUND_CHARACTER &&
                // compound characters can't be consecutive
                !COMPOUND.includes(lastCharacter) &&
                // the same compound character can't appear more than once
                !name.includes(compoundCharacter) &&
                // probability
                this.check(0.2)
            ) {
                character = compoundCharacter;
                hasCompoundCharacter = true;
            } else {
                const vowel = this.element(VOWELS_FLATTEN);
                if (
                    // can't have more than 2 consecutive consonants
                    (!VOWELS_LETTERS.includes(lastCharacter) &&
                        !VOWELS_LETTERS.includes(penultimateCharacter)) ||
                    // vowels can't be consecutive, unless probability
                    ((this.check(0.15) ||
                        !VOWELS_LETTERS.includes(lastCharacter)) &&
                        // probability
                        this.check(0.8))
                ) {
                    character = vowel;
                } else {
                    character = this.element(CONSONANTS_FLATTEN);
                }
            }

            name += character;
        }

        return name && name[0].toUpperCase() + name.slice(1);
    }

    range(min = 0, max = 100) {
        if (min > max) {
            throw new Error(`Min "${min}" greater than max "${max}".`);
        }

        return Math.floor(this.rng() * (max - min + 1)) + min;
    }

    element(array) {
        if (array.length === 0) {
            return null;
        }

        const index = this.range(0, array.length - 1);

        return array[index];
    }

    check(threshold) {
        return this.next <= threshold;
    }
}

module.exports = RNG;
