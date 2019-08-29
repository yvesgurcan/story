const chai = require('chai');
const RNG = require('../RNG');
const RNGSingleton = require('../RNGSingleton');

const expect = chai.expect;
const seed1 = undefined;
const seed2 = 123;

const rngSingleton = new RNGSingleton(seed1);
const rng1 = new RNG().init(seed2);
const rng2 = new RNG().init(seed2);

describe('Random Number Generator', function() {
    describe('Singleton', function() {
        it('get newSeed() should return a float', function() {
            const randomValue1 = rngSingleton.newSeed;
            expect(randomValue1).to.be.a('number');
            expect(randomValue1 % 1).to.not.equal(0);
        });
        it('get next() should return a float', function() {
            const randomValue1 = rngSingleton.next;
            expect(randomValue1).to.be.a('number');
            expect(randomValue1 % 1).to.not.equal(0);
        });

        it('range() should return an integer between min and max', function() {
            const min = -40;
            const max = 50;
            const randomValue1 = rngSingleton.range(min, max);
            expect(randomValue1).to.be.a('number');
            expect(randomValue1 % 1).to.equal(0);
            expect(randomValue1).to.be.above(min);
            expect(randomValue1).to.be.below(max);
        });
    });
    describe('Consistency between instances with same seed', function() {
        it('get next() should return same result', function() {
            const randomValue1 = rng1.next;
            const randomValue2 = rng2.next;
            expect(randomValue1).to.equal(randomValue2);
        });

        it('range() should return same result', function() {
            const randomValue1 = rng1.range(0, 100);
            const randomValue2 = rng2.range(0, 100);
            expect(randomValue1).to.equal(randomValue2);
        });
    });
});
