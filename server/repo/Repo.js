'use strict';
/**
 * Interface for a repository
 * @interface
 */
class Repo {
    store() {
        throw new Error('Not implemented');
    }

    find() {
        throw new Error('Not implemented');
    }

    update() {
        throw new Error('Not implemented');
    }

    query() {
        throw new Error('Not implemented');
    }

    delete() {
        throw new Error('Not implemented');
    }
}
module.exports = Repo;
