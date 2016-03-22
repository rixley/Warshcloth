/* eslint-env mocha */
let sinon = require('sinon');
let Repo = require('../server/repo/Repo');
let UserService = require('../server/service/UserService');

describe('User Service', () => {
    it('should create users', () => {
        let username = 'Ray';
        let repo = new Repo();
        let mockRepo = sinon.mock(repo)
            .expects('store')
            .once()
            .withArgs(sinon.match((arg) => arg.name === 'Ray'))
            .returns(Promise.resolve());
        return UserService.create(username).run(repo)
            .then(() => mockRepo.verify());
    });
});
