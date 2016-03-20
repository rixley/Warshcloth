const Nothing = {
    isEmpty: true,
    isDefined: false,
    get: () => { throw new ReferenceError('Nothing.get'); },
    map: () => Nothing
};

function Just(it) {
    return {
        isEmpty: false,
        isDefined: true,
        get: () => it,
        map: (fn) => Maybe(fn(it))
    };
}

function Maybe(something) {
    return (something !== undefined && something !== null)
        ? Just(something)
        : Nothing;
}
module.exports.Maybe = Maybe;
