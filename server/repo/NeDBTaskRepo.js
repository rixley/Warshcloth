'use strict';
let Repo = require('./Repo');
let Datastore = require('nedb');
let Task = require('../model/Task');
let Maybe = require('../../lib/monad/Maybe').Maybe;

/**
 * Translates an nedb task doc to a task
 * @param {Object} taskDoc
 * @return {Task} task
 */
function docToTask(taskDoc) {
    return new Task(taskDoc._id, taskDoc.desc);
}

class NeDBTaskRepo extends Repo {
    constructor(config) {
        super();

        this.db = new Datastore(config);
    }

    /**
     * Stores a task
     * @param {Task} task
     * @return {Promise<Object>}
     */
    store(task) {
        return new Promise((resolve, reject) => {
            let taskDoc = Task.toJson(task);
            taskDoc._id = task.id;
            delete taskDoc.id;
            this.db.insert(taskDoc, (err, newDoc) => {
                if (err) return reject(err);
                resolve(newDoc);
            });
        });
    }

    /**
     * Finds tasks
     * @return {Promise<Task[]>}
     */
    find() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, found) => {
                if (err) return reject(err);
                resolve(found);
            });
        }).then((found) => found.map(docToTask));
    }

    /**
     * Gets a task by id
     * @param {string} id
     * @return {Promise<Maybe<Task>>}
     */
    query(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: id }, (err, found) => {
                if (err) return reject(err);

                resolve(Maybe(found).map(docToTask));
            });
        });
    }

    /**
     * Deletes a task by id
     * @param {string} id
     * @return {Promise}
     */
    delete(id) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: id }, (err, numRemoved) => {
                if (err) return reject(err);
                if (numRemoved !== 1) return reject(new Error('Unexpected number of documents removed'));
                resolve();
            });
        });
    }

    /**
     * Updates a task
     * @param {string} id
     * @param {Object} update
     * @return {Promise<Task>}
     */
    update(id, update) {
        return new Promise((resolve, reject) => {
            let options = {};

            this.db.update({ _id: id }, update, options, (err, numAffected) => {
                if (err) return reject(err);
                if (numAffected !== 1) return reject(new Error(`Unexpected number of rows affected: ${numAffected}`));
                resolve();
            });
        });
    }
}
module.exports = NeDBTaskRepo;
