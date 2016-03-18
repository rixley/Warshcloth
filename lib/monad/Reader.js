/** A Reader monad */
class Reader {
    /**
     * @param {Function} run
     */
    constructor(run) {
        /** @function */
        this.run = run;
    }

    /**
     * Applies the given function to the result of the run command.
     * @param {Function} fn
     * @return {Reader}
     */
    map(f) {
        return new Reader((env) => f(this.run(env)));
    }
}
module.exports = Reader;
