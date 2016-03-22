'use strict';
/** Representation of a user */
class User {
    /**
     * Creates a user
     * @param {string} id
     * @param {string} username
     */
    constructor(id, username) {
        this.id = id;
        this.name = username;
    }

    /**
     * Returns the json representation of a user
     * @param {User} user
     * @return {Object}
     */
    static toJson(user) {
        return {
            id: user.id,
            name: user.name
        };
    }
}

module.exports = User;
