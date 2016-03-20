'use strict';
let uuid = require('uuid');
let Task = require('../model/Task');
let Reader = require('../../lib/monad/Reader');

/** The task service */
class TaskService {
    /**
     * Creates a new task
     * @param {string} desc the task description
     * @return {Reader}
     */
    static create(desc) {
        let task = new Task(uuid.v4(), desc);

        return new Reader((repo) => repo.store(task).then(() => task));
    }

    /**
     * Lists all tasks
     * @return {Reader}
     */
    static getTasks() {
        return new Reader((repo) => repo.find());
    }

    /**
     * Deletes a task by id
     * @param {string} id
     * @return {Reader}
     */
    static delete(id) {
        return new Reader((repo) => repo.delete(id));
    }

    /**
     * Gets a task by id
     * @param {string} id
     * @return {Reader}
     */
    static getTask(id) {
        return new Reader((repo) => repo.query(id));
    }
}
module.exports = TaskService;
