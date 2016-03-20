/* eslint-env mocha */
let assert = require('assert');
let Reader = require('../lib/monad/Reader');

describe('Reader monad', () => {
    it('should implement map', () => {
        let arr = [1, 2, 3];
        let result = new Reader((a) => a[0])
            .map((n) => n + 3)
            .map((n) => n + 2)
            .run(arr);

        assert.equal(result, 6);
    });

    it('should implement flatMap', () => {
        function push1() { return new Reader((arr) => arr.push(1)); }
        function push2() { return new Reader((arr) => arr.push(2)); }
        function pop() {
            return new Reader((arr) => {
                arr.pop();
                return arr;
            });
        }

        let result = push1().flatMap(push2).flatMap(push1).flatMap(pop).run([]);
        assert.deepEqual(result, [1, 2]);
    });
});
