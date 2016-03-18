'use strict';
let express = require('express');
let TaskService = require('../service/TaskService');
let Task = require('../model/Task');

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
        });
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
        });
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
        });
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
        });

}

/******************************
 * Route bindings
 *****************************/
function taskRouter(repo) {
    let router = express.Router();
    router.post('/task', createTask.bind(undefined, repo));
    router.get('/task', getTasks.bind(undefined, repo));
    router.get('/task/:id', getTask.bind(undefined, repo));
    router.delete('/task/:id', deleteTask.bind(undefined, repo));
    return router;
}

module.exports = {
    taskRouter: taskRouter,
    createTask: createTask,
    getTasks: getTasks,
    getTask: getTask,
    deleteTask: deleteTask
};
