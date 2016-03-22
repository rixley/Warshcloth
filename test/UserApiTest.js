/* eslint-env mocha */
let express = require('express');
let sinon = require('sinon');

let UserApi = require('../server/api/user');
let Repo = require('../server/repo/Repo');

describe('User API', () => {
    it('should support creating users', () => {
        let repo = new Repo();
        let username = 'Ray';
        let mockRepo = sinon.mock(repo)
            .expects('store')
            .once()
            .withArgs(sinon.match((arg) => arg.name === username))
            .returns(Promise.resolve());
        let req = Object.create(express.request);
        req.body = { name: username };
        let res = Object.create(express.response);
        let mockRes = sinon.mock(res)
            .expects('json')
            .once()
            .withArgs(sinon.match((arg) => arg.id !== undefined));
        return UserApi.createUser(repo, req, res)
            .then(() => {
                mockRepo.verify();
                mockRes.verify();
            });
    });
});
