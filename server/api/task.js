'use strict';
let express = require('express');
let TaskService = require('../service/TaskService');
let Task = require('../model/Task');
let _ = require('lodash');

/**
 * Generic error handler
 * @param {Response} res
 * @param {Error} err
 */
function onError(res, err) {
    return res.status(500).send(err.message);
}

/******************************
 * Handlers
 *****************************/

/**
 * Create task request handler
 * @param {Repo} repo
 * @param {Request} req a request
 * @param {Response} res the response
 * @return {Promise}
 */
function createTask(repo, req, res) {
    return TaskService.create(req.body.desc).run(repo)
        .then((task) => {
            res.json({
                id: task.id
            });
        })
        .catch(onError.bind(undefined, res));
}

/**
 * Gets all tasks
 * @param {Repo} repo
 * @param {Request} req a request
 * @param {Response} res the response
 * @return {Promise}
 */
function getTasks(repo, req, res) {
    return TaskService.getTasks().run(repo)
        .then((tasks) => {
            res.json(tasks);
        })
        .catch(onError.bind(undefined, res));
}

/**
 * Get a task by id
 * @param {Repo} repo
 * @param {Request} req a request
 * @param {Response} res the response
 * @return {Promise}
 */
function getTask(repo, req, res) {
    return TaskService.getTask(req.params.id).run(repo)
        .then((maybeTask) => {
            if (maybeTask.isDefined) {
                let task = maybeTask.get();
                let taskJson = Task.toJson(task);
                res.json(taskJson);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(onError.bind(undefined, res));
}

/**
 * Deletes a task by id
 * @param {Repo} repo
 * @param {Request} req a request
 * @param {Response} res the response
 * @return {Promise}
 */
function deleteTask(repo, req, res) {
    return TaskService.getTask(req.params.id).run(repo)
        .then((maybeTask) => {
            if (maybeTask.isDefined) {
                let task = maybeTask.get();
                TaskService.delete(task.id).run(repo);
                let taskJson = Task.toJson(task);
                res.json(taskJson);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(onError.bind(undefined, res));

}

/**
 * Updates a task
 * @param {Repo} repo
 * @param {Request} req a request
 * @param {Response} res the response
 * @return {Promise}
 */
function updateTask(repo, req, res) {
    let update = _.pick(req.body, ['desc']);
    return TaskService.update(req.params.id, update).run(repo)
        .then(() => res.json({}))
        .catch(onError.bind(undefined, res));

}

/******************************
 * Route bindings
 *****************************/
function taskRouter(repo) {
    let router = express.Router();
    router.post('/api/task', createTask.bind(undefined, repo));
    router.get('/api/task', getTasks.bind(undefined, repo));
    router.get('/api/task/:id', getTask.bind(undefined, repo));
    router.delete('/api/task/:id', deleteTask.bind(undefined, repo));
    router.put('/api/task/:id', updateTask.bind(undefined, repo));
    return router;
}

module.exports = {
    taskRouter: taskRouter,
    createTask: createTask,
    getTasks: getTasks,
    getTask: getTask,
    deleteTask: deleteTask,
    updateTask: updateTask
};
