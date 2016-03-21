/* eslint-env mocha */
let NeDBUserRepo = require('../server/repo/NeDBUserRepo');
let User = require('../server/model/User');

describe('User Repo', () => {
    it('should store users', () => {
        let config = {autoload: true};
        let repo = new NeDBUserRepo(config);
        let username = 'Ray';
        let user = new User(username);
        return repo.store(user);
    });
});
