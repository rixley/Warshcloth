'use strict';
let uuid = require('uuid');
let Reader = require('../../lib/monad/Reader');
let User = require('../model/User');

class UserService {
    /**
     * Creates a user
     * @param {string} username
     * @return {Reader}
     */
    static create(username) {
        return new Reader((repo) => {
            let id = uuid.v4();
            let user = new User(id, username);
            return repo.store(user).then(() => user);
        });
    }
}
module.exports = UserService;
