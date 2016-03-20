/* eslint-env mocha */
let assert = require('assert');
let {Maybe} = require('../../../lib/monad/Maybe.js');

describe('Maybe monad', () => {
    it('should construct Justs and Nothings', () => {
        let nothing = Maybe(null);
        let alsoNothing = Maybe(undefined);
        let aThing = 'a thing';
        let something = Maybe(aThing);

        assert(nothing.isEmpty);
        assert(!nothing.isDefined);
        assert(alsoNothing.isEmpty);
        assert(!alsoNothing.isDefined);
        assert(something.isDefined);
        assert(!something.isEmpty);
        assert.equal(something.get(), aThing);
    });

    it('should implement map', () => {
        let something = Maybe('something');
        let result = something
            .map((s) => s + ' is')
            .map((s) => s + ' right');

        assert.equal(result.get(), 'something is right');

        let nothing = Maybe(null);
        result = nothing.map(() => 'fail');
        assert.throws(() => nothing.get(), ReferenceError);
    });
});
