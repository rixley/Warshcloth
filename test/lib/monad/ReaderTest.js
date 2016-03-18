/* eslint-env mocha */
let assert = require('assert');
let Reader = require('../../../lib/monad/Reader');

describe('Reader monad', () => {
    it('should implement map', () => {
        let arr = [1, 2, 3];
        let result = new Reader((a) => a[0])
            .map((n) => n + 3)
            .map((n) => n + 2)
            .run(arr);

        assert.equal(result, 6);
    });
});
