'use strict';
let express = require('express');
let UserService = require('../service/UserService');

/**
 * Create user api handler
 * @param {Repo} repo
 * @param {Request} req a request
 * @param {Response} res the response
 * @return {Promise}
 */
function createUser(repo, req, res) {
    return UserService.create(req.body.name).run(repo)
        .then((user) => {
            return res.json({ id: user.id });
        });
}
module.exports.createUser = createUser;

/**
 * Returns an express user router
 * @param {Repo} Repo
 * @return {Router}
 */
function userRouter(repo) {
    let router = express.Router();
    router.post('/api/user', createUser.bind(undefined, repo));
    return router;
}
module.exports.userRouter = userRouter;
